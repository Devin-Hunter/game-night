import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.members import MemberOut, MemberRepo, MemberOutWithPassword


class MemberAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        members: MemberRepo,
    ):
        # Use your repo to get the member based on the
        # username (which could be an email)
        return members.get(username)

    def get_account_getter(
        self,
        members: MemberRepo = Depends(),
    ):
        # Return the members. That's it.
        return members

    def get_hashed_password(self, member: MemberOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return member.hashed_password

    def get_account_data_for_cookie(self, member: MemberOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return member.username, MemberOut(**member.dict())


authenticator = MemberAuthenticator(os.environ["SIGNING_KEY"])
