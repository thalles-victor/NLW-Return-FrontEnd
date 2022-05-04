import { ArrowLeft, Camera } from 'phosphor-react';
import React, { useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { ClosedButton } from '../../ClosedButton';
import { ScreenShootButtoon } from './ScreenShootButton';

interface FeedbackContentProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export const FeedbackContentStep: React.FC<FeedbackContentProps> = ({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: React.FormEvent) {
    event.preventDefault();

    console.log({
      screenshot,
      comment
    })
    onFeedbackSent()
  }

  return(
    <>
      <header>


        <button
          type="button"
          className="top-5 left-5 absolute hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={ feedbackTypeInfo.image.source }  alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          { feedbackTypeInfo.title }
          <ClosedButton />
        </span>
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-200 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

          <footer className="flex gap-2 mt-2">
            <ScreenShootButtoon
              screenshot={screenshot}
              onScreenshotTook={setScreenshot}
            />

            <button
              type="submit"
              disabled={comment.length === 0}
              className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
              
            >Enviar feedback </button>
          </footer>

      </form>
    </>
  );
}