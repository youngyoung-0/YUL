function initCardDuel() {
  const card1Select = document.getElementById('card1-select');
  const card2Select = document.getElementById('card2-select');
  const card1VisualImg = document.getElementById('card1-visual-img');
  const card2VisualImg = document.getElementById('card2-visual-img');
  const categoryChips = document.querySelectorAll('.category-chip');
  const startDuelBtn = document.getElementById('start-duel-btn');
  
  const resultWrapper = document.getElementById('duel-result-wrapper');
  const c1Name = document.getElementById('c1-name');
  const c1Val = document.getElementById('c1-val');
  const c1Card = document.getElementById('c1-card');
  
  const c2Name = document.getElementById('c2-name');
  const c2Val = document.getElementById('c2-val');
  const c2Card = document.getElementById('c2-card');
  
  const verdictText = document.getElementById('verdict-text');
  const verdictDiff = document.getElementById('verdict-diff');
  
  let selectedCategory = 'food';

  function updateSetupCardVisual(selectEl, imgEl) {
    const cardId = selectEl.value;
    const card = window.CARD_DATABASE.find(c => c.id === cardId);
    if (card && imgEl) {
      imgEl.src = `assets/images/${card.image}`;
    }
  }

  // Populate card select menus
  if (window.CARD_DATABASE) {
    window.CARD_DATABASE.forEach((card, index) => {
      const option1 = new Option(card.name, card.id);
      const option2 = new Option(card.name, card.id);
      
      // Default selections
      if (index === 0) option1.selected = true;
      if (index === 1) option2.selected = true;
      
      card1Select.add(option1);
      card2Select.add(option2);
    });

    // Initialize images
    updateSetupCardVisual(card1Select, card1VisualImg);
    updateSetupCardVisual(card2Select, card2VisualImg);
  }

  // Handle dropdown changes
  card1Select.addEventListener('change', () => updateSetupCardVisual(card1Select, card1VisualImg));
  card2Select.addEventListener('change', () => updateSetupCardVisual(card2Select, card2VisualImg));

  // Handle category chip selection
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedCategory = chip.dataset.category;
    });
  });

  // Duel logic
  startDuelBtn.addEventListener('click', () => {
    const c1Id = card1Select.value;
    const c2Id = card2Select.value;
    
    if (c1Id === c2Id) {
      alert("서로 다른 카드를 선택해주세요!");
      return;
    }
    
    const card1 = window.CARD_DATABASE.find(c => c.id === c1Id);
    const card2 = window.CARD_DATABASE.find(c => c.id === c2Id);
    
    if (!card1 || !card2) return;
    
    // Simulate benefits
    // Base assumption: 500,000 KRW monthly spend.
    // 200,000 KRW in selected category, 300,000 KRW base spend.
    const categorySpend = 200000;
    const baseSpend = 300000;
    
    const c1CategoryBenefit = categorySpend * (card1.benefits[selectedCategory] || card1.benefits.base);
    const c1BaseBenefit = baseSpend * card1.benefits.base;
    const c1Total = Math.min(card1.limit, c1CategoryBenefit + c1BaseBenefit);
    
    const c2CategoryBenefit = categorySpend * (card2.benefits[selectedCategory] || card2.benefits.base);
    const c2BaseBenefit = baseSpend * card2.benefits.base;
    const c2Total = Math.min(card2.limit, c2CategoryBenefit + c2BaseBenefit);

    const c1Stamp = document.getElementById('c1-stamp-wrapper');
    const c2Stamp = document.getElementById('c2-stamp-wrapper');

    // Reset stamps and opacity/filters
    c1Stamp.innerHTML = '';
    c2Stamp.innerHTML = '';
    c1Card.style.filter = 'none';
    c2Card.style.filter = 'none';
    c1Card.style.opacity = '1';
    c2Card.style.opacity = '1';

    // Update UI elements
    c1Name.textContent = card1.name;
    c1Val.textContent = `₩${c1Total.toLocaleString()}`;
    c1Card.className = `duel-result-card ${card1.theme}`;
    c1Card.style.backgroundImage = `url('assets/images/${card1.image}')`;
    
    c2Name.textContent = card2.name;
    c2Val.textContent = `₩${c2Total.toLocaleString()}`;
    c2Card.className = `duel-result-card ${card2.theme}`;
    c2Card.style.backgroundImage = `url('assets/images/${card2.image}')`;
    
    // Render result effects
    resultWrapper.style.display = 'block';
    
    // Calculate winner
    let verdict = "";
    let diffStr = "";
    
    if (c1Total > c2Total) {
      const diff = c1Total - c2Total;
      verdict = `${card1.name} 승리!`;
      diffStr = `월 ₩${diff.toLocaleString()} (연간 ₩${(diff * 12).toLocaleString()})의 혜택 차이가 발생합니다.`;
      
      c1Card.style.transform = 'scale(1.1) rotate(-4deg)';
      c2Card.style.transform = 'scale(0.9) rotate(4deg)';
      c2Card.style.opacity = '0.5';
      c2Card.style.filter = 'grayscale(60%) blur(1px)';
      
      c1Stamp.innerHTML = '<div class="duel-stamp winner-stamp"><i class="fa-solid fa-crown"></i> WINNER</div>';
      c2Stamp.innerHTML = '<div class="duel-stamp loser-stamp"><i class="fa-solid fa-money-bill-transfer"></i> LEAKAGE</div>';
    } else if (c2Total > c1Total) {
      const diff = c2Total - c1Total;
      verdict = `${card2.name} 승리!`;
      diffStr = `월 ₩${diff.toLocaleString()} (연간 ₩${(diff * 12).toLocaleString()})의 혜택 차이가 발생합니다.`;
      
      c2Card.style.transform = 'scale(1.1) rotate(4deg)';
      c1Card.style.transform = 'scale(0.9) rotate(-4deg)';
      c1Card.style.opacity = '0.5';
      c1Card.style.filter = 'grayscale(60%) blur(1px)';
      
      c2Stamp.innerHTML = '<div class="duel-stamp winner-stamp"><i class="fa-solid fa-crown"></i> WINNER</div>';
      c1Stamp.innerHTML = '<div class="duel-stamp loser-stamp"><i class="fa-solid fa-money-bill-transfer"></i> LEAKAGE</div>';
    } else {
      verdict = "무승부";
      diffStr = "두 카드의 예상 혜택이 일치합니다.";
      c1Card.style.transform = 'none';
      c2Card.style.transform = 'none';
    }
    
    verdictText.textContent = verdict;
    verdictDiff.textContent = diffStr;
    
    // Smooth scroll down to result
    resultWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
window.initCardDuel = initCardDuel;
