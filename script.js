let scene, camera, renderer, controls;

function init() {
    // Создаем сцену
    scene = new THREE.Scene();
    
    // Создаем камеру (перспективная камера)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Создаем рендерер и добавляем его в HTML-страницу
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);  // Растягиваем на весь экран
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Добавляем свет
    const light = new THREE.AmbientLight(0x404040, 2); // мягкий белый свет
    scene.add(light);
    
    // Создание острова
    createIsland();
    
    // Создаем воду
    createWater();
    
    // Добавляем туман
    scene.fog = new THREE.FogExp2(0xaaaaaa, 0.1);  // Легкий туман

    // Перемещение камеры
    camera.position.z = 5;

    // Инициализация OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;  // Для плавного движения
    controls.dampingFactor = 0.25; // Плавность
    controls.screenSpacePanning = false; // Чтобы панорамирование не выходило за пределы экрана
    controls.maxPolarAngle = Math.PI / 2; // Ограничим угол поворота камеры (чтобы не смотреть вниз)
    
    animate();
}

// Функция для анимации
function animate() {
    requestAnimationFrame(animate);
    
    // Обновляем управление камерой
    controls.update();  // Для плавного обновления

    renderer.render(scene, camera);
}

// Создание острова (в виде 3D объекта)
function createIsland() {
    const geometry = new THREE.CylinderGeometry(2, 2, 1, 32); // цилиндр для острова
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // зеленый материал
    const island = new THREE.Mesh(geometry, material);

    island.position.y = -1; // Поднимаем остров над водой
    scene.add(island);
}

// Создание воды
function createWater() {
    const geometry = new THREE.PlaneGeometry(10, 10);  // Плоскость для воды
    const material = new THREE.MeshBasicMaterial({ color: 0x1e90ff, side: THREE.DoubleSide });  // Голубой цвет для воды
    const water = new THREE.Mesh(geometry, material);

    water.rotation.x = Math.PI / 2; // Вращаем воду, чтобы она лежала горизонтально
    scene.add(water);
}

// Инициализация игры
init();
