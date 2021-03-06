import bugImageUrl from '../../assets/icons/button-card-Figmoji-Bug.svg';
import ideaImageUrl from '../../assets/icons/button-card-Figmoji-Idea.svg';
import thoughtImageUrl from '../../assets/icons/button-card-Figmoji-Thought.svg';
import { useState } from "react";

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export type FeedbackType = keyof typeof feedbackTypes;

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Image de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagen de uma lâmpada',
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  },
};

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<null | FeedbackType>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }
  
  return(
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ? 
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} /> 
            : (
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )
          }
        </>
      )}
      
      <p>Obrigado</p>
      <footer className="text-xs text-neutral-480">
        Feito com ❤️ pela <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  );
}