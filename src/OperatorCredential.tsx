import * as React from "react";
import { UniqueVerifiableCredential } from "@veramo/core";
import { OperatorSummary } from "./OperatorSummary";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const OperatorCredential: React.FC<{credential: UniqueVerifiableCredential}> = ({ credential: { verifiableCredential, hash } }) => {
  const navigate = useNavigate()

  return (
    <Button 
      type="text"
      onClick={() => navigate('/codyfight/operator/' + hash)}
    >
      <OperatorSummary credential={verifiableCredential} />
    </Button>
  )
}
