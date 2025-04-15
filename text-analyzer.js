// Text Analyzer Script
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    
    // Results Elements
    const letterCount = document.getElementById('letterCount');
    const wordCount = document.getElementById('wordCount');
    const spaceCount = document.getElementById('spaceCount');
    const newlineCount = document.getElementById('newlineCount');
    const specialCount = document.getElementById('specialCount');
    const pronounResults = document.getElementById('pronounResults');
    const prepositionResults = document.getElementById('prepositionResults');
    const articleResults = document.getElementById('articleResults');
    
    // Lists of words to check for
    const pronouns = [
        "i", "me", "my", "mine", "myself", 
        "you", "your", "yours", "yourself", "yourselves",
        "he", "him", "his", "himself", 
        "she", "her", "hers", "herself", 
        "it", "its", "itself", 
        "we", "us", "our", "ours", "ourselves", 
        "they", "them", "their", "theirs", "themselves", 
        "who", "whom", "whose", "which", "what", 
        "that", "this", "these", "those"
    ];
    
    const prepositions = [
        "about", "above", "across", "after", "against", "along", "amid", "among", 
        "around", "at", "before", "behind", "below", "beneath", "beside", "between", 
        "beyond", "by", "concerning", "considering", "despite", "down", "during", 
        "except", "for", "from", "in", "inside", "into", "like", "near", "of", 
        "off", "on", "onto", "out", "outside", "over", "past", "regarding", 
        "round", "since", "through", "throughout", "to", "toward", "towards", 
        "under", "underneath", "until", "unto", "up", "upon", "with", "within", "without"
    ];
    
    const indefiniteArticles = ["a", "an"];
    
    // Sample text for testing (excerpt from a public domain book - Pride and Prejudice)
    const sampleText = `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? How can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."

"Is that his design in settling here?"

"Design! Nonsense, how can you talk so! But it is very likely that he may fall in love with one of them, and therefore you must visit him as soon as he comes."

"I see no occasion for that. You and the girls may go, or you may send them by themselves, which perhaps will be still better, for as you are as handsome as any of them, Mr. Bingley may like you the best of the party."

"My dear, you flatter me. I certainly have had my share of beauty, but I do not pretend to be anything extraordinary now. When a woman has five grown-up daughters, she ought to give over thinking of her own beauty."

"In such cases, a woman has not often much beauty to think of."

"But, my dear, you must indeed go and see Mr. Bingley when he comes into the neighbourhood."

"It is more than I engage for, I assure you."

"But consider your daughters. Only think what an establishment it would be for one of them. Sir William and Lady Lucas are determined to go, merely on that account, for in general, you know, they visit no newcomers. Indeed you must go, for it will be impossible for us to visit him if you do not."

"You are over-scrupulous, surely. I dare say Mr. Bingley will be very glad to see you; and I will send a few lines by you to assure him of my hearty consent to his marrying whichever he chooses of the girls; though I must throw in a good word for my little Lizzy."

"I desire you will do no such thing. Lizzy is not a bit better than the others; and I am sure she is not half so handsome as Jane, nor half so good-humoured as Lydia. But you are always giving her the preference."

"They have none of them much to recommend them," replied he; "they are all silly and ignorant like other girls; but Lizzy has something more of quickness than her sisters."

"Mr. Bennet, how can you abuse your own children in such a way? You take delight in vexing me. You have no compassion for my poor nerves."

"You mistake me, my dear. I have a high respect for your nerves. They are my old friends. I have heard you mention them with consideration these last twenty years at least."

"Ah, you do not know what I suffer."

"But I hope you will get over it, and live to see many young men of four thousand a year come into the neighbourhood."

"It will be no use to us, if twenty such should come, since you will not visit them."

"Depend upon it, my dear, that when there are twenty, I will visit them all."

Mr. Bennet was so odd a mixture of quick parts, sarcastic humour, reserve, and caprice, that the experience of three-and-twenty years had been insufficient to make his wife understand his character. Her mind was less difficult to develop. She was a woman of mean understanding, little information, and uncertain temper. When she was discontented, she fancied herself nervous. The business of her life was to get her daughters married; its solace was visiting and news.
`;

    // Event Listeners
    analyzeBtn.addEventListener('click', analyzeText);
    clearBtn.addEventListener('click', clearAll);
    sampleBtn.addEventListener('click', loadSample);
    
    // Main Analysis Function
    function analyzeText() {
        const text = textInput.value;
        
        if (!text.trim()) {
            alert('Please enter some text to analyze.');
            return;
        }
        
        // Basic statistics
        calculateBasicStats(text);
        
        // Tokenize text (convert to lowercase and split by word boundaries)
        const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Analyze word types
        analyzeParts(tokens, pronouns, pronounResults);
        analyzeParts(tokens, prepositions, prepositionResults);
        analyzeParts(tokens, indefiniteArticles, articleResults);
    }
    
    // Calculate basic statistics about the text
    function calculateBasicStats(text) {
        // Count letters
        const letters = text.match(/[a-zA-Z]/g) || [];
        letterCount.textContent = letters.length;
        
        // Count words
        const words = text.match(/\b\w+\b/g) || [];
        wordCount.textContent = words.length;
        
        // Count spaces
        const spaces = text.match(/[ ]/g) || [];
        spaceCount.textContent = spaces.length;
        
        // Count newlines
        const newlines = text.match(/\n/g) || [];
        newlineCount.textContent = newlines.length;
        
        // Count special symbols (non-alphanumeric, non-space, non-newline)
        const specials = text.match(/[^\w\s]/g) || [];
        specialCount.textContent = specials.length;
    }
    
    // Analyze parts of speech (pronouns, prepositions, articles)
    function analyzeParts(tokens, wordList, resultElement) {
        // Create a counter object
        const counts = {};
        
        // Initialize counts for all words in the list
        wordList.forEach(word => {
            counts[word] = 0;
        });
        
        // Count occurrences
        tokens.forEach(token => {
            if (wordList.includes(token)) {
                counts[token]++;
            }
        });
        
        // Display results
        displayResults(counts, resultElement);
    }
    
    // Display results in the given element
    function displayResults(counts, resultElement) {
        // Clear previous results
        resultElement.innerHTML = '';
        
        // Sort by count (descending)
        const sortedWords = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        
        // Check if any words were found
        const hasResults = sortedWords.some(word => counts[word] > 0);
        
        if (!hasResults) {
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = 'No matches found in the text';
            resultElement.appendChild(noResults);
            return;
        }
        
        // Create elements for each word with a count > 0
        sortedWords.forEach(word => {
            if (counts[word] > 0) {
                const wordItem = document.createElement('div');
                wordItem.className = 'word-count-item';
                
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                wordSpan.textContent = word;
                
                const countSpan = document.createElement('span');
                countSpan.className = 'count';
                countSpan.textContent = counts[word];
                
                wordItem.appendChild(wordSpan);
                wordItem.appendChild(countSpan);
                resultElement.appendChild(wordItem);
            }
        });
    }
    
    // Clear all input and results
    function clearAll() {
        textInput.value = '';
        letterCount.textContent = '0';
        wordCount.textContent = '0';
        spaceCount.textContent = '0';
        newlineCount.textContent = '0';
        specialCount.textContent = '0';
        
        pronounResults.innerHTML = '<p class="no-results">Results will appear here after analysis</p>';
        prepositionResults.innerHTML = '<p class="no-results">Results will appear here after analysis</p>';
        articleResults.innerHTML = '<p class="no-results">Results will appear here after analysis</p>';
    }
    
    // Load sample text
    function loadSample() {
        textInput.value = sampleText;
        analyzeText();
    }
});