from datetime import datetime, timedelta

from jose import JWTError, jwt

from passlib.context import CryptContext


# SECRET KEY
SECRET_KEY = "mysecretkey"

# JWT Algorithm
ALGORITHM = "HS256"

# Token Expiry
ACCESS_TOKEN_EXPIRE_MINUTES = 30


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# HASH PASSWORD
def hash_password(password: str):
    return pwd_context.hash(password)


# VERIFY PASSWORD
def verify_password(
    plain_password: str,
    hashed_password: str
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# CREATE ACCESS TOKEN
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

# VERIFY TOKEN
def verify_access_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            return None

        return email

    except JWTError:
        return None