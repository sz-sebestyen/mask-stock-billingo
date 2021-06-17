import { useState, useEffect } from "react";

export default function MaskStock() {
  const [masks, setMasks] = useState(null);
  const url = "http://localhost:3001/maskNumber";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMasks(data));
  }, []);

  return (
    <div>
      (current stock:{" "}
      {masks
        ? new Intl.NumberFormat("hu-HU").format(masks) + " pieces"
        : "loading..."}
      )
    </div>
  );
}
