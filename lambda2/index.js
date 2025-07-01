export const handler = async (event) => {
  const intentName = event.sessionState.intent.name;

  if (intentName === "PauseIntent") {
    return {
      sessionState: {
        dialogAction: {
          type: "ElicitIntent"
        },
        intent: {
          name: "PauseIntent",
          state: "Fulfilled"
        },
        sessionAttributes: {
          ...(event.sessionAttributes || {}),
          lastPauseTimestamp: `${Date.now()}`
        }
      },
      messages: [
        {
          contentType: "PlainText",
          content: "Sure, I’ll hold. Let me know when you’re ready."
        }
      ]
    };
  }

  // fallback: not PauseIntent
  return {
    sessionState: {
      dialogAction: {
        type: "Delegate"
      },
      intent: event.sessionState.intent
    }
  };
};
