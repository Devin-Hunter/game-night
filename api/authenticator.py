import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.members import MemberOut, MemberRepo, MemberOutWithPassword


class MemberAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        member: MemberRepo,
    ):
        return member.get(username)

    def get_account_getter(
        self,
        members: MemberRepo = Depends(),
    ):
        return members

    def get_hashed_password(self, member: MemberOutWithPassword):
        print('dict:', member)
        return member.hashed_password

    def get_account_data_for_cookie(self, member: MemberOut):
        return member.username, MemberOut(**member.dict())


authenticator = MemberAuthenticator(os.environ["SIGNING_KEY"])
