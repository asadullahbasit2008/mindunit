document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('chatbot-wrapper')) {
    const chatbotHTML = `
      <div id="chatbot-wrapper">
        <button id="chatbot-toggle-btn" onclick="toggleChatbot()" title="Open Fandom AI">
          <i class="bi bi-robot"></i>
        </button>
        <div id="chatbot-box" class="chatbot-hidden">
          <div class="chatbot-header d-flex justify-content-between align-items-center p-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-cpu text-purple fs-4"></i>
              <div>
                <h6 class="mb-0 fw-bold text-light">FandomAI Assistant</h6>
                <small class="text-success"><i class="bi bi-circle-fill fs-6"></i> Online</small>
              </div>
            </div>
            <button class="btn-close btn-close-white" onclick="toggleChatbot()"></button>
          </div>
          <div class="chatbot-body p-3" id="chatMessages">
            <div class="chat-msg bot-msg">
              <div class="msg-content">
                Hey Fandomer! 🚀 Main **FandomVerse AI** hoon. Movies, TV Shows, ya Anime ke baare mein kuch bhi poochiye!
              </div>
            </div>
          </div>
          <div class="chatbot-footer p-2 border-top border-secondary">
            <div class="input-group">
              <input type="text" id="chatInput" class="form-control bg-dark text-light border-secondary" placeholder="Ask about shows..." onkeypress="handleChatKeyPress(event)">
              <button class="btn bg-purple text-white" onclick="sendChatMessage()">
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }
});

function toggleChatbot() {
  const chatBox = document.getElementById('chatbot-box');
  if (chatBox) chatBox.classList.toggle('chatbot-hidden');
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const query = input.value.trim();
  if (!query) return;

  const messagesContainer = document.getElementById('chatMessages');
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user-msg';
  userDiv.innerHTML = '<div class="msg-content">' + safeText(query) + '</div>';
  messagesContainer.appendChild(userDiv);

  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    const botReply = generateFandomResponse(query);
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot-msg';
    botDiv.innerHTML = '<div class="msg-content">' + botReply + '</div>';
    messagesContainer.appendChild(botDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 600);
}

function generateFandomResponse(text) {
  const q = text.toLowerCase();

  if (q.match(/\b(hi|hello|hey|greetings|wassup|ssup)\b/)) {
    return getRandom([
      "Hey Fandomer! Aaj kya dekhne ka mood hai?",
      "Welcome back to FandomVerse! Kaunse show ya movie ki details chahiye?",
      "Hello! Main Fandomverse AI hoon. Binge-watching guide chahiye?"
    ]);
  }

  if (q.match(/\b(movie|movies|film|cinema|watch)\b/)) {
    if (q.includes('action') || q.includes('thriller')) {
      return "Action movies ke liye aap The Dark Knight, John Wick, ya Mad Max try kar sakte hain!";
    }
    return "Top Trending Movies: Dune: Part Two, Oppenheimer, aur Avatar. Aap humare Movies section par trailers dekh sakte hain!";
  }

  if (q.match(/\b(show|series|tv|binge|drama)\b/)) {
    if (q.includes('best') || q.includes('recommend') || q.includes('suggest')) {
      return "Top Binge Recommendations: 1. Breaking Bad, 2. Stranger Things, 3. The Last of Us, 4. House of the Dragon";
    }
    return "TV Kingdom section mein aapko trending shows aur trailers mil jayenge!";
  }

  if (q.includes('walter') || q.includes('breaking bad') || q.includes('heisenberg')) {
    return "Walter White aka Heisenberg ek High School Chemist tha jo Meth Overlord ban gaya. Breaking Bad IMDb score: 9.5/10!";
  }
  if (q.includes('stranger things') || q.includes('eleven')) {
    return "Stranger Things 4 mein Upside Down ka sabse bada khatra Vecna aatha hai. Eleven ke paas telekinetic powers hain!";
  }
  if (q.includes('game of thrones') || q.includes('got') || q.includes('jon snow')) {
    return "Jon Snow Night's Watch ka Lord Commander aur Aegon Targaryen hai. Winter is Coming!";
  }
  if (q.includes('witcher') || q.includes('geralt')) {
    return "Geralt of Rivia (The Witcher) monster hunter hai jo Destiny dwara Ciri se juda hai.";
  }

  if (q.includes('bookmark') || q.includes('save')) {
    return "Kisi bhi card par Bookmark icon click karein, woh aapke Saved page par store ho jayega!";
  }
  if (q.includes('trailer') || q.includes('video')) {
    return "Watch Trailer button click karte hi Pop-up video player open ho jayega!";
  }

  return getRandom([
    '"' + text + '" ke baare mein abhi data load ho raha hai. Aap Anime, Movies, ya TV Shows search kar sakte hain!',
    'Hmm, kya aap "' + text + '" se related koi show ya character find kar rahe hain? Mujhe thoda aur detail batayein!',
    "Main Movies, TV Series, Anime aur Comics ke queries answer kar sakta hoon. Kuch aur poochna chahenge?"
  ]);
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function safeText(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
