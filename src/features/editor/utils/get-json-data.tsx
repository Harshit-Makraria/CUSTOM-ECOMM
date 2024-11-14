import { ResponseType } from "@/features/projects/api/use-get-project";
import { CanvaJson } from "@prisma/client";
import React, { useCallback, useMemo } from "react";

export default function UseGetJsonData(jsonArray: ResponseType["data"]['json'], jsonId: string) {
  const jsonData = useMemo(()=>{
    let tempJsonData = jsonArray[0];
  jsonArray.map((el) => {
    if (el.id == jsonId) {
      tempJsonData = el;
    }
  });
  return tempJsonData;
  } , [jsonArray , jsonId])

  return jsonData
  
}
