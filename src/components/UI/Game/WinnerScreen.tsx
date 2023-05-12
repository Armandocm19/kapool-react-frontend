import { useState, useEffect } from "react";
import { type ILeaderboard } from "../../../interfaces/ILeaderboard";
import { fireworks } from "../../../utils";
import "../../../styles/loader.css";

interface IProps {
  leaderboard: ILeaderboard[];
}

export const WinnerScreen = ({ leaderboard }: IProps) => {
  const [previewScreenWinner, setPreviewScreenWinner] = useState(true);
  const topWinners = leaderboard.sort((a, b) => b.score - a.score).slice(0, 3);

  useEffect(() => {
    setTimeout(() => {
      fireworks();
      setPreviewScreenWinner(false);
    }, 3000);
  }, []);

  return (
    <>
      {previewScreenWinner && (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#3194F4] to-[#5571EC] flex flex-col items-center justify-center gap-20">
          <h2 className="text-[#E3E6E8] font-bold text-6xl">Cargando Podium</h2>
          <div className="line-wobble"></div>
        </div>
      )}
      {!previewScreenWinner && (
        <section className="w-full min-h-screen flex items-center justify-between bg-gradient-to-b from-[#3194F4] to-[#5571EC] flex-col pt-20 text-[#E3E6E8] relative">
          <h1 className="text-7xl font-bold">Podium</h1>
          <div className="flex items-end justify-center h-[65vh]">
            {topWinners.length > 2 && (
              <div className="flex flex-col justify-end items-center gap-8 w-[300px] h-4/6">
                <h2 className="bg-[#FFFFFF26] rounded-full py-3 px-5 text-center text-3xl font-semibold min-w-[200px]">
                  {topWinners[2].player}
                </h2>
                <div className="flex justify-center bg-[#FFA750] rounded-tl-2xl pt-14 h-full w-full shadow-inner">
                  <div className="bg-[#FFC892] h-fit rounded-full py-5 px-10 text-8xl font-bold text-[#C66300]">
                    3
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col justify-end items-center gap-8 w-[350px] h-full">
              <h2 className="bg-[#FFFFFF26] rounded-full py-3 px-5 text-center text-3xl font-semibold min-w-[200px]">
                {topWinners[0].player}
              </h2>
              <div className="flex justify-center bg-[#FFC727] rounded-t-2xl pt-14 flex-1 h-5/6 h-400px w-full shadow-2xl">
                <div className="bg-[#FFD457] h-fit rounded-full py-5 px-10 text-8xl font-bold">
                  1
                </div>
              </div>
            </div>
            {topWinners.length > 1 && (
              <div className="flex flex-col justify-end items-center gap-8 w-[300px] h-5/6">
                <h2 className="bg-[#FFFFFF26] rounded-full py-3 px-5 text-center text-3xl font-semibold min-w-[200px]">
                  {topWinners[1].player}
                </h2>
                <div className="flex justify-center bg-[#DFDFDF] rounded-tr-2xl pt-14 flex-1 w-full">
                  <div className="bg-[#F0F0F0] h-fit rounded-full py-5 px-10 text-8xl font-bold text-[#ABABAB]">
                    2
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-5 right-5">
            <small>
              Design by{" "}
              <a
                href="https://github.com/JeremyDevCode"
                target="_blank"
                className="text-[#F0F0F0] font-medium"
              >
                JeremyDev
              </a>
            </small>
          </div>
        </section>
      )}
    </>
  );
};
