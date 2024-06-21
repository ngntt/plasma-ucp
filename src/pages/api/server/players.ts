// @ts-ignore
import query from "samp-query";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseData } from "@/data-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "GET") {
    const options = {
      host: "204.10.192.68",
      port: 5001,
    };

    await query(options, (err: string, data: object) => {
      if (err) {
        res.status(500).json({
          success: false,
          data: null,
          error: err,
        });

        return;
      }

      res.status(200).json({
        success: true,
        data,
        error: null,
      });
    });
  } else {
    res.status(400).json({
      success: false,
      data: null,
      error: "Invalid request method",
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
