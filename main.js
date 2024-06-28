document.addEventListener("DOMContentLoaded", () => {
    const settingsForm = document.getElementById("settingsForm");
    const box = document.getElementById("box");
    const logo = document.getElementById("logo");
    const speedSlider = document.getElementById("Speed");
    const speedValue = document.getElementById("speedValue");

    document.getElementById("Logoupload").addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            logo.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    document.getElementById("Bgimage").addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            box.style.backgroundImage = `url(${event.target.result})`;
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    speedSlider.addEventListener("input", () => {
        speedValue.textContent = speedSlider.value;
    });

    window.applySettings = function () {
        const boxWidth = document.getElementById("Bwidth").value;
        const boxHeight = document.getElementById("Bheight").value;
        const logoWidth = document.getElementById("Lwidth").value;
        const logoHeight = document.getElementById("Lheight").value;
        const bgColor = document.getElementById("Bgcolor").value;
        const borderRadius = document.getElementById("Borderradius").value;
        const enableBorderRadius = document.getElementById("EnableBorderRadius").checked;
        const speed = speedSlider.value;

        if (boxWidth) box.style.width = `${boxWidth}px`;
        if (boxHeight) box.style.height = `${boxHeight}px`;
        if (logoWidth) logo.style.width = `${logoWidth}px`;
        if (logoHeight) logo.style.height = `${logoHeight}px`;
        if (bgColor) box.style.backgroundColor = bgColor;
        if (enableBorderRadius) {
            box.style.borderRadius = `${borderRadius}px`;
        } else {
            box.style.borderRadius = '0px';
        }

        const keyframesX = `
            @keyframes moveX {
                from {
                    left: 0;
                }
                to {
                    left: ${box.clientWidth - logo.clientWidth}px;
                }
            }
        `;

        const keyframesY = `
            @keyframes moveY {
                from {
                    top: 0;
                }
                to {
                    top: ${box.clientHeight - logo.clientHeight}px;
                }
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = keyframesX + keyframesY;
        document.head.appendChild(styleSheet);

        logo.style.animation = `moveX ${2 / speed}s linear 0s infinite alternate, moveY ${3.4 / speed}s linear 0s infinite alternate`;
    };
});
