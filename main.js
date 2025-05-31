const radios = document.querySelectorAll('input[name="resolution"]');
const info = document.getElementById('resolution-info');

function toggleInfo() {
  const anyChecked = Array.from(radios).some(radio => radio.checked);
  info.style.display = anyChecked ? 'none' : 'block';
}

// Run once on load
toggleInfo();

radios.forEach(radio => {
  radio.addEventListener('click', function(e) {
    if (this.wasChecked) {
      this.checked = false;
      this.wasChecked = false;
      this.dispatchEvent(new Event('change')); // trigger change to update info display
    } else {
      radios.forEach(r => r.wasChecked = false); // reset all
      this.wasChecked = true;
    }
  });

  radio.addEventListener('change', toggleInfo);
});


const minSlider = document.getElementById("budget-min");
const maxSlider = document.getElementById("budget-max");
const minValLabel = document.getElementById("budgetMinVal");
const maxValLabel = document.getElementById("budgetMaxVal");

const minGap = 100; // Minimum difference

function updateLabels() {
  minValLabel.textContent = minSlider.value;
  maxValLabel.textContent = maxSlider.value;
}

minSlider.addEventListener("input", () => {
  if (parseInt(minSlider.value) > parseInt(maxSlider.value) - minGap) {
    minSlider.value = maxSlider.value - minGap;
  }
  updateLabels();
});

maxSlider.addEventListener("input", () => {
  if (parseInt(maxSlider.value) < parseInt(minSlider.value) + minGap) {
    maxSlider.value = parseInt(minSlider.value) + minGap;
  }
  updateLabels();
});

// Initialize values
updateLabels();


function getPartPrices(budget,storage) {
    /*
    *   price[0] = GPU
    *   price[1] = CPU
    *   price[2] = MOBO
    *   price[3] = RAM
    *   price[4] = Storage
    *   price[5] = Case
    *   price[6] = PSU
    *   price[7] = Cooling
    */
    const price = new Array(8).fill(0);
    if(budget <= 1000) {
        price[2] = 100;
        price[3] = 40; //RAM
        price[4] = 55 * storage; //Storage
        price[5] = 80; //Case
        price[6] = 50; //PSU
        price[7] = 25; //Cooling

        //price[1] = //CPU
        //price[2] = //CPU
    } else if (budget <= 2000) {

    } else {
        
    }

}