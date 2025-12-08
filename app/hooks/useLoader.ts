import { useState } from "react";

export function useLoader() {
  const [loading, setLoading] = useState(false);

  const wrap = async (fn: () => Promise<any>) => {
    setLoading(true);
    const result = await fn();
    setLoading(false);
    return result;
  };

  return { loading, wrap };
}
