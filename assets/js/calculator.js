function initSavingsCalculator() {
  const foodSlider = document.getElementById('slider-food');
  const shoppingSlider = document.getElementById('slider-shopping');
  const fuelSlider = document.getElementById('slider-fuel');
  const transportSlider = document.getElementById('slider-transport');
  
  const foodVal = document.getElementById('val-food');
  const shoppingVal = document.getElementById('val-shopping');
  const fuelVal = document.getElementById('val-fuel');
  const transportVal = document.getElementById('val-transport');
  
  const totalSpend = document.getElementById('total-spend');
  const leakageVal = document.getElementById('leakage-val');
  const savingsVal = document.getElementById('savings-val');

  function calculateLeakage() {
    const food = parseInt(foodSlider.value) * 10000;
    const shopping = parseInt(shoppingSlider.value) * 10000;
    const fuel = parseInt(fuelSlider.value) * 10000;
    const transport = parseInt(transportSlider.value) * 10000;

    // Update value text
    foodVal.textContent = `${parseInt(foodSlider.value)}만 원`;
    shoppingVal.textContent = `${parseInt(shoppingSlider.value)}만 원`;
    fuelVal.textContent = `${parseInt(fuelSlider.value)}만 원`;
    transportVal.textContent = `${parseInt(transportSlider.value)}만 원`;

    // Dynamic slider visual background track fills
    [foodSlider, shoppingSlider, fuelSlider, transportSlider].forEach(slider => {
      const percentage = ((slider.value - slider.min) * 100 / (slider.max - slider.min)) + '% 100%';
      slider.style.backgroundSize = percentage;
    });

    const total = food + shopping + fuel + transport;
    totalSpend.textContent = `₩${total.toLocaleString()}`;

    // Non-optimized vs Optimized benefit rate
    // Average sub-optimal picker rate = 1.5%
    // Optimized dual/triple cards combo = 4.0%
    const rateNonOptimized = 0.015;
    const rateOptimized = 0.040;

    const monthlyLeakage = total * (rateOptimized - rateNonOptimized);
    const yearlySavings = monthlyLeakage * 12;

    // Render calculations
    leakageVal.textContent = `₩${Math.round(monthlyLeakage).toLocaleString()}`;
    savingsVal.textContent = `₩${Math.round(yearlySavings).toLocaleString()}`;
  }

  // Bind input events
  [foodSlider, shoppingSlider, fuelSlider, transportSlider].forEach(slider => {
    slider.addEventListener('input', calculateLeakage);
  });

  // Run initial calculation
  calculateLeakage();
}
window.initSavingsCalculator = initSavingsCalculator;
