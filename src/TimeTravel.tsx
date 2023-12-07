import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const TimeTravel = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const listener = (event: CustomEvent) => {
      queryClient.setQueryData([event.detail.queryKey], event.detail.queryData);
    };
    window.addEventListener("UpdateUI", listener);
    return () => window.removeEventListener("UpdateUI", listener);
  }, []);

  return <></>;
};

export default TimeTravel;
