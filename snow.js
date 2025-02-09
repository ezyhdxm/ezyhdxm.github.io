// 🌨️ 创建雪花动画
function createSnowflakes() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄";

    // 随机大小 & 位置
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.fontSize = Math.random() * 10 + 8 + "px"; 
    snowflake.style.animationDuration = Math.random() * 5 + 3 + "s"; 

    document.body.appendChild(snowflake);

    // 5秒后删除
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// 每200ms 生成一个雪花
setInterval(createSnowflakes, 200);
