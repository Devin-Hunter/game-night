import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.members import MemberOut, MemberRepo, MemberOutWithPassword

#take in plain text pw and encrypt it
#secretkey = hashed password
#store hashed pw in database
#on login check if pw == decrypted hashed pw
    # if yes 
        #issue access_token
        #token type: Bearer
    #if not
        #return error message w/"invalid token"
        #return status_code 401

class MemberAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: MemberRepo,
    ):
        # Use your repo to get the member based on the
        # username (which could be an email)
        return users.get(username)

    def get_account_getter(
        self,
        users: MemberRepo = Depends(),
    ):
        # Return the members. That's it.
        return users

    def get_hashed_password(self, user: MemberOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return user.hashed_password

    def get_account_data_for_cookie(self, user: MemberOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, MemberOut(**user.dict())


authenticator = MemberAuthenticator(os.environ["SIGNING_KEY"])