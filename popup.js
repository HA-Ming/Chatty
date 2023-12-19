document.addEventListener('DOMContentLoaded', function () {
  const userInput = document.getElementById('userInput');
  const sendMessageButton = document.getElementById('sendMessage');
  const responseElement = document.getElementById('response');

  sendMessageButton.addEventListener('click', function () {
      const message = userInput.value.trim();

      if (message === '') {
          // Handle empty input, e.g., show an error message
          return;
      }

      const apiKey = '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';
      const apiUrl = 'https://api.openai.com/v1/chat/completions';

      fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: message }]
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          const reply = data.choices[0].message.content;
          responseElement.textContent = `ChatGPT: ${reply}`;
      })
      .catch(error => {
          console.error('Error fetching ChatGPT response:', error);
          responseElement.textContent = `Error: ${error.message}`;
      });
  });
});
