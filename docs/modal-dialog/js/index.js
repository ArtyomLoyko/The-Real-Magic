const magicsMenuWindow = document.getElementById('magics-menu-box');
const bombBtn = document.getElementById('bomb');
const medkit = document.getElementById('medkit');
const attackMagicsList = document.getElementById('attack-magics-box');
const attackMagicsBtn = document.getElementById('attack-magics-btn');

bombBtn.addEventListener('click', () => {
  magicsMenuWindow.classList.toggle('hidden');
  attackMagicsList.classList.toggle('hidden');
});

medkit.addEventListener('click', () => {
  magicsMenuWindow.classList.toggle('hidden');
  attackMagicsList.classList.toggle('hidden');
});

attackMagicsBtn.addEventListener('click', () => {
  magicsMenuWindow.classList.toggle('hidden');
  attackMagicsList.classList.toggle('hidden');
});
