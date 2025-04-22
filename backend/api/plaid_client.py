# plaid_client.py
import os
from dotenv import load_dotenv
from plaid import ApiClient, Configuration
from plaid.api.plaid_api import PlaidApi

load_dotenv()

# Load from .env
PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID")
PLAID_SECRET = os.getenv("PLAID_SECRET")
PLAID_ENV = os.getenv("PLAID_ENV", "sandbox").lower()

# Host mapping
host_map = {
    "sandbox": "https://sandbox.plaid.com",
    "development": "https://development.plaid.com",
    "production": "https://production.plaid.com"
}

configuration = Configuration(
    host=host_map[PLAID_ENV],
    api_key={
        "clientId": PLAID_CLIENT_ID,
        "secret": PLAID_SECRET,
    }
)

api_client = ApiClient(configuration)
client = PlaidApi(api_client)