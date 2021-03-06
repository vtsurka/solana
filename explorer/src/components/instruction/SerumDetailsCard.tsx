import React from "react";
import { TransactionInstruction, SignatureResult } from "@solana/web3.js";
import { InstructionCard } from "./InstructionCard";
import { parseSerumInstructionTitle } from "utils/tx";
import { useCluster } from "providers/cluster";
import { reportError } from "utils/sentry";

export function SerumDetailsCard({
  ix,
  index,
  result,
  signature,
}: {
  ix: TransactionInstruction;
  index: number;
  result: SignatureResult;
  signature: string;
}) {
  const { url } = useCluster();

  let title;
  try {
    title = parseSerumInstructionTitle(ix);
  } catch (error) {
    reportError(error, {
      url: url,
      signature: signature,
    });
  }

  return (
    <InstructionCard
      ix={ix}
      index={index}
      result={result}
      title={title || "Unknown"}
      defaultRaw
    />
  );
}
