import React, { useEffect, useState } from "react";
import { firestore, storage } from "../firebase";
import ReactPlayer from "react-player";

const Interview = () => {
  return (
    <div>
      <h1>Deniz Umut Şengün</h1>
      <br />
      <br />
      <h1>Kendinizden bahseder misiniz ?</h1>
      <ReactPlayer url="https://www.youtube.com/watch?v=_oWyEWvoq4k" />
      <br />
      <br />
      <h1>Güçlü ve Zayıf yönleriniz nelerdir ?</h1>
      <ReactPlayer url="https://www.youtube.com/watch?v=QyUlSH2lkNY" />
      <br />
      <br />
      <h1>Maaş beklentiniz nedir ?</h1>
      <ReactPlayer url="https://www.youtube.com/watch?v=rxcy94gsPmQ" />
      <br />
      <br />
      <h1>
        karşılaştığınız zor bir durumu ve onu nasıl çözdüğünüzü anlatabilir
        misiniz ?
      </h1>
      <ReactPlayer url="https://www.youtube.com/watch?v=hnl1MSLD4ys" />
    </div>
  );
};

export default Interview;
