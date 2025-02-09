// 🎨 模式切换逻辑
const indexModeToggle = document.getElementById("indexModeToggle");
let isDayMode = true;




const leafEmojis = ["🍁"]; // 叶子 Emoji

function createLeaf() {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");

    // **确保 `#falling-leaves` 存在**
    const leavesContainer = document.getElementById("falling-leaves");
    if (!leavesContainer) return;

    // 选择随机叶子 Emoji
    leaf.innerText = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];

    // 随机初始位置
    leaf.style.left = Math.random() * window.innerWidth + "px";
    leaf.style.top = `-${Math.random() * 20 + 10}vh`; // 让叶子从屏幕上方开始

    // 随机大小
    const size = Math.random() * 10 + 5; // 20~50px
    leaf.style.fontSize = `${size}px`;

    // 透明度
    leaf.style.opacity = Math.random() * 0.8 + 0.2;

    // 随机动画持续时间（让叶子飘落时间不同）
    const fallDuration = Math.random() * 6 + 5; // 5~11秒飘落
    leaf.style.animationDuration = `${fallDuration}s, ${Math.random() * 3 + 4}s`;

    // 让每片叶子随机有 `animation-delay`
    leaf.style.animationDelay = `${Math.random() * 2}s`;

    // 添加到 `#falling-leaves` 容器
    leavesContainer.appendChild(leaf);

    // **一定时间后删除叶子，防止内存泄漏**
    setTimeout(() => {
        leaf.remove();
    }, fallDuration * 1000);
}
// 🍁 启动落叶动画
let leafInterval;
function startFallingLeaves() {
    stopFallingLeaves(); // 清除旧的 Interval，防止重复调用
    leafInterval = setInterval(createLeaf, 1000); // 每秒生成一片叶子
}

// ❄ 停止落叶动画
function stopFallingLeaves() {
    clearInterval(leafInterval);
    const leavesContainer = document.getElementById("falling-leaves");
    if (leavesContainer) {
        leavesContainer.innerHTML = ""; // 清除所有叶子
    }
}

// 🚀 切换白天/夜晚模式
/* indexModeToggle.addEventListener("click", function () {
    isDayMode = !isDayMode;

    if (isDayMode) {
        document.body.classList.remove("night-mode");
        document.body.classList.add("day-mode");
        indexModeToggle.textContent = " ";

        // stopSnowfall();
        startFallingLeaves();
    } else {
        document.body.classList.remove("day-mode");
        document.body.classList.add("night-mode");
        indexModeToggle.textContent = " ";

        stopFallingLeaves();
        randomizeNeonEffect(); 
    }
});
*/


// 🌞 页面加载时默认进入白天模式


