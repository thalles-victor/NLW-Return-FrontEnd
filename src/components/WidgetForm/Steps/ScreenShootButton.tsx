import React, { useState } from 'react';
import { Camera, Trash } from 'phosphor-react';
import html2canvas from 'html2canvas';
import { Loading } from '../Loading';

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screeshot: string | null)  => void;
}

export const ScreenShootButtoon: React.FC<ScreenshotButtonProps> = ({ onScreenshotTook, screenshot }) => {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState<boolean>(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');
    
    onScreenshotTook(base64image);

    setIsTakingScreenshot(false);
  }
  if (screenshot) {
    return(
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash
          weight="fill"
          onClick={() => onScreenshotTook(null) }
        />
      </button>
    );
  }

  return(
    <button
    type="button"
    className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    onClick={handleTakeScreenshot}
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" /> }
      
    </button>
  );
}