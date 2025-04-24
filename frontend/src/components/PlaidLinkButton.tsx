import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import api from '../api';

interface Props {
  onSuccessCallback: () => void;
}

export const PlaidLinkButton: React.FC<Props> = ({ onSuccessCallback }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        const res = await api.get("/api/create_link_token/");
        setLinkToken(res.data.link_token);
      } catch (err) {
        console.error("Error fetching link token:", err);
      }
    };

    getLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (public_token) => {
      try {
        const res = await api.post("/api/exchange_public_token/", {
          public_token,
        });
        console.log("✅ Public token exchanged successfully");
        localStorage.setItem("plaid_access_token", res.data.access_token);
        
        // Add short delay before calling transaction fetch
        setTimeout(() => {
          onSuccessCallback();
        }, 2000); // Wait 2 seconds


        // onSuccessCallback();


      } catch (err) {
        console.error("❌ Error exchanging public token:", err);
      }
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Connect Bank
    </button>
  );
};