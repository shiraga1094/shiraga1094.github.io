// 終端機動畫控制腳本
function initTerminalAnimation() {
    const terminalStartup = document.querySelector('.terminal-startup');
    const terminalLines = document.querySelectorAll('.terminal-line');
    const loader = document.querySelector('.loader');
    
    // 一開始隱藏載入動畫，讓終端機先執行
    if (loader) {
        loader.classList.add('hidden');
    }
    
    if (!terminalStartup || !terminalLines.length) return;
    
    // 更新檔案日期為今天
    updateFileDates();
    
    // 隱藏所有行
    terminalLines.forEach(line => {
        line.classList.add('hidden');
    });
    
    let currentLineIndex = 0;
    
    function typeNextLine() {
        if (currentLineIndex >= terminalLines.length) {
            // 所有行都完成後，等待1秒然後淡出
            setTimeout(() => {
                // 終端機開始淡出的同時立即顯示載入動畫
                startOriginalLoader();
                terminalStartup.classList.add('fade-out');
            }, 1000);
            return;
        }
        
        const currentLine = terminalLines[currentLineIndex];
        currentLine.classList.remove('hidden');
        currentLine.classList.add('typing');
        
        // 獲取原始文本內容
        const originalHTML = currentLine.innerHTML;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        const originalText = tempDiv.textContent || tempDiv.innerText || '';
        
        // 清空當前行並開始打字
        currentLine.innerHTML = '';
        let charIndex = 0;
        
        // 如果是prompt行，先顯示prompt部分
        if (originalHTML.includes('class="prompt"')) {
            const promptMatch = originalHTML.match(/<span class="prompt">(.*?)<\/span>/);
            if (promptMatch) {
                currentLine.innerHTML = `<span class="prompt">${promptMatch[1]}</span>`;
                const commandMatch = originalHTML.match(/<span class="command">(.*?)<\/span>/);
                if (commandMatch) {
                    const commandText = commandMatch[1];
                    typeCommand(currentLine, commandText);
                } else {
                    // 如果沒有command，直接進入下一行
                    setTimeout(() => {
                        currentLineIndex++;
                        typeNextLine();
                    }, 500);
                }
                return;
            }
        }
        
        // 如果是output行，直接顯示
        if (originalHTML.includes('class="output"')) {
            const outputMatch = originalHTML.match(/<span class="output"[^>]*>(.*?)<\/span>/);
            if (outputMatch) {
                const outputText = outputMatch[1];
                const outputId = originalHTML.match(/id="([^"]*)"/) ? ` id="${originalHTML.match(/id="([^"]*)"/)[1]}"` : '';
                typeText(currentLine, `<span class="output"${outputId}>${outputText}</span>`, () => {
                    setTimeout(() => {
                        currentLineIndex++;
                        typeNextLine();
                    }, 300);
                });
                return;
            }
        }
        
        // 如果是final-line，顯示prompt和cursor
        if (currentLine.classList.contains('final-line')) {
            const promptMatch = originalHTML.match(/<span class="prompt">(.*?)<\/span>/);
            if (promptMatch) {
                currentLine.innerHTML = `<span class="prompt">${promptMatch[1]}</span><span class="cursor"></span>`;
            }
            return;
        }
        
        // 預設情況：直接顯示原內容
        currentLine.innerHTML = originalHTML;
        setTimeout(() => {
            currentLineIndex++;
            typeNextLine();
        }, 300);
    }
    
    function typeCommand(lineElement, commandText) {
        let charIndex = 0;
        const originalPrompt = lineElement.innerHTML;
        
        function typeChar() {
            if (charIndex < commandText.length) {
                const currentText = commandText.substring(0, charIndex + 1);
                lineElement.innerHTML = originalPrompt + `<span class="command">${currentText}</span><span class="typing-cursor"></span>`;
                charIndex++;
                setTimeout(typeChar, 80); // 每個字符間隔80ms
            } else {
                // 完成打字，移除光標
                lineElement.innerHTML = originalPrompt + `<span class="command">${commandText}</span>`;
                setTimeout(() => {
                    currentLineIndex++;
                    typeNextLine();
                }, 500);
            }
        }
        
        typeChar();
    }
    
    function typeText(lineElement, html, callback) {
        lineElement.innerHTML = html;
        if (callback) callback();
    }
    
    // 開始打字動畫
    typeNextLine();
}

function updateFileDates() {
    // 獲取今天的日期
    const today = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const month = monthNames[today.getMonth()];
    const day = today.getDate().toString().padStart(2, ' ');
    const year = today.getFullYear();
    
    const dateString = `${month} ${day} ${year}`;
    
    // 更新檔案日期
    const lsAbout = document.getElementById('ls-about');
    const lsPortfolio = document.getElementById('ls-portfolio');
    const lsIndex = document.getElementById('ls-index');
    
    if (lsAbout) {
        lsAbout.textContent = `drwxr-xr-x 3 shiraga staff  96 ${dateString} about/`;
    }
    if (lsPortfolio) {
        lsPortfolio.textContent = `drwxr-xr-x 2 shiraga staff  64 ${dateString} portfolio/`;
    }
    if (lsIndex) {
        lsIndex.textContent = `-rw-r--r-- 1 shiraga staff 2048 ${dateString} index.html`;
    }
}

function startOriginalLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        // 移除隱藏狀態，顯示載入動畫
        loader.classList.remove('hidden');
        
        // 重新觸發內部動畫
        const loaderText = loader.querySelector('.loader-text');
        const loaderLine = loader.querySelector('.loader-line');
        
        if (loaderText && loaderLine) {
            // 重置動畫
            loaderText.style.animation = 'none';
            loaderLine.style.animation = 'none';
            
            // 強制重繪
            void loaderText.offsetWidth;
            void loaderLine.offsetWidth;
            
            // 重新啟動動畫
            loaderText.style.animation = 'gentleFadeIn 2s ease-out 0.3s forwards';
            loaderLine.style.animation = 'expandLine 1.5s ease-out 1s forwards';
        }
        
        // 3秒後淡出載入動畫
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 3000);
    }
}

// DOM載入完成後立即啟動終端機動畫（不等待資源載入）
document.addEventListener('DOMContentLoaded', () => {
    initTerminalAnimation();
});