document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Elements
    const splashScreen = document.getElementById('splash-screen');
    const appMain = document.getElementById('app');
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');

    const inputDiameter = document.getElementById('input-diameter');
    const inputLength = document.getElementById('input-length');
    const inputCount = document.getElementById('input-count');
    const diameterBtns = document.querySelectorAll('.diameter-btn');

    const btnCalculate = document.getElementById('btn-calculate');
    const btnClear = document.getElementById('btn-clear');
    const btnExport = document.getElementById('btn-export');
    const btnClearHistory = document.getElementById('btn-clear-history');

    const resUnitWeight = document.getElementById('res-unit-weight');
    const resSingleWeight = document.getElementById('res-single-weight');
    const resTotalLength = document.getElementById('res-total-length');
    const resTotalWeight = document.getElementById('res-total-weight');
    const resultCard = document.getElementById('result-card');

    const concreteLength = document.getElementById('concrete-length');
    const concreteWidth = document.getElementById('concrete-width');
    const concreteHeight = document.getElementById('concrete-height');
    const btnCalcConcrete = document.getElementById('btn-calc-concrete');
    const btnClearConcrete = document.getElementById('btn-clear-concrete');
    const resConcreteVolume = document.getElementById('res-concrete-volume');
    const resConcreteWeight = document.getElementById('res-concrete-weight');
    const concreteResultContainer = document.getElementById('concrete-result-container');
    const concreteCanvas = document.getElementById('concreteCanvas');
    let ctxC; 
    if(concreteCanvas) ctxC = concreteCanvas.getContext('2d');

    const meshWidth = document.getElementById('mesh-width');
    const meshHeight = document.getElementById('mesh-height');
    const meshStepX = document.getElementById('mesh-step-x');
    const meshStepY = document.getElementById('mesh-step-y');
    const meshDiameter = document.getElementById('mesh-diameter');
    const meshDiameterBtns = document.querySelectorAll('.mesh-diameter-btn');
    const btnCalcMesh = document.getElementById('btn-calc-mesh');
    const resMeshLength = document.getElementById('res-mesh-length');
    const resMeshWeight = document.getElementById('res-mesh-weight');
    const meshResultContainer = document.getElementById('mesh-result-container');
    const meshCanvas = document.getElementById('meshCanvas');
    let ctx;
    if(meshCanvas) ctx = meshCanvas.getContext('2d');

    const trussSpan = document.getElementById('truss-span');
    const trussHeight = document.getElementById('truss-height');
    const trussPanels = document.getElementById('truss-panels');
    const trussType = document.getElementById('truss-type');
    const trussMainProfile = document.getElementById('truss-main-profile');
    const trussInnerProfile = document.getElementById('truss-inner-profile');
    const btnCalcTruss = document.getElementById('btn-calc-truss');
    const resTrussWeight = document.getElementById('res-truss-weight');
    const resTrussLength = document.getElementById('res-truss-length');
    const trussResultContainer = document.getElementById('truss-result-container');
    const trussSvgContainer = document.getElementById('truss-svg-container');
    const btnExportTruss = document.getElementById('btn-export-truss');
    
    // 3D View variables
    let scenes = {
        truss: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('truss-3d-container') },
        concrete: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('concrete-3d-container') },
        rebar: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('rebar-3d-container') },
        mesh: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('mesh-3d-container') }
    };
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // State
    let history = JSON.parse(localStorage.getItem('armatura_history') || '[]');
    let currentTheme = localStorage.getItem('armatura_theme') || 'dark';

    // Initialize Theme
    applyTheme(currentTheme);

    // Splash Screen Timeout
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            appMain.classList.remove('hidden');
        }, 500);
    }, 2500);

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');

            // Update Nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Update Pages
            pages.forEach(p => {
                p.classList.remove('active');
                if (p.id === `page-${pageId}`) {
                    p.classList.add('active');
                }
            });

            if (pageId === 'history') renderHistory();
        });
    });

    // Quick Diameter Selection (Main)
    diameterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            diameterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            inputDiameter.value = btn.getAttribute('data-val');
        });
    });

    // Quick Diameter Selection for Mesh
    meshDiameterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            meshDiameterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            meshDiameter.value = btn.getAttribute('data-val');
        });
    });

    // Calculation Logic
    function calculate() {
        const d = parseFloat(inputDiameter.value);
        const l = parseFloat(inputLength.value);
        const n = parseInt(inputCount.value);

        if (!d || !l || !n) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        // Formula: m = d^2 / 162
        const unitWeight = (d * d) / 162;
        const singleWeight = unitWeight * l;
        const totalLength = l * n;
        const totalWeight = unitWeight * totalLength;

        // Animate results
        animateValue(resUnitWeight, 0, unitWeight, 1000, 3);
        animateValue(resSingleWeight, 0, singleWeight, 1000, 2);
        animateValue(resTotalLength, 0, totalLength, 1000, 2);
        animateValue(resTotalWeight, 0, totalWeight, 1000, 2);

        // Show result card
        resultCard.classList.remove('hidden-animated');
        resultCard.classList.add('visible-animated');

        drawRebarVisual(l, d);
        updateRebar3D(l, d);

        // Save to history
        saveToHistory({
            type: 'Armatura',
            diameter: d,
            length: l,
            count: n,
            unitWeight: unitWeight.toFixed(3),
            totalWeight: totalWeight.toFixed(2),
            date: new Date().toLocaleString()
        });
    }

    function animateValue(obj, start, end, duration, decimals = 2) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = (progress * (end - start)) + start;
            obj.innerHTML = current.toFixed(decimals);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function saveToHistory(item) {
        history.unshift(item);
        if (history.length > 50) history.pop();
        localStorage.setItem('armatura_history', JSON.stringify(history));
    }

    function renderHistory() {
        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="history"></i>
                    <p>Hozircha tarix mavjud emas</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        historyList.innerHTML = history.map((item, index) => {
            if (item.type === 'Ferma') {
                return `
                    <div class="glass-card history-card clickable-history" data-index="${index}">
                        <div class="history-info">
                            <h4>Ferma: ${item.info}</h4>
                            <p>${item.date}</p>
                        </div>
                        <div class="history-weight">
                            <span class="weight-val">${item.weight} kg</span>
                            <span class="res-unit">jami</span>
                        </div>
                    </div>
                `;
            }
            if (item.type === 'Setka') {
                return `
                    <div class="glass-card history-card clickable-history" data-index="${index}">
                        <div class="history-info">
                            <h4>Setka: ${item.w}x${item.h}m (Ø${item.d})</h4>
                            <p>${item.date}</p>
                        </div>
                        <div class="history-weight">
                            <span class="weight-val">${item.weight} kg</span>
                            <span class="res-unit">jami</span>
                        </div>
                    </div>
                `;
            }
            if (item.type === 'Beton') {
                return `
                    <div class="glass-card history-card clickable-history" data-index="${index}">
                        <div class="history-info">
                            <h4>Beton: ${item.l}x${item.w}x${item.h}m</h4>
                            <p>${item.date}</p>
                        </div>
                        <div class="history-weight">
                            <span class="weight-val">${item.volume} m³</span>
                            <span class="res-unit">hajm</span>
                        </div>
                    </div>
                `;
            }
            return `
                <div class="glass-card history-card clickable-history" data-index="${index}">
                    <div class="history-info">
                        <h4>Ø${item.diameter}mm - ${item.length}m x ${item.count}dona</h4>
                        <p>${item.date}</p>
                    </div>
                    <div class="history-weight">
                        <span class="weight-val">${item.totalWeight} kg</span>
                        <span class="res-unit">jami</span>
                    </div>
                </div>
            `;
        }).join('');

        // Add click listeners to history items
        document.querySelectorAll('.clickable-history').forEach(el => {
            el.addEventListener('click', () => {
                const index = el.getAttribute('data-index');
                restoreHistoryItem(history[index]);
            });
        });
    }

    function restoreHistoryItem(item) {
        if (item.type === 'Ferma') {
            switchPage('truss');
            // Extract L, H from info if needed or store them separately. 
            // For now, let's just switch and prompt to re-enter or store them.
            // Better to update saveToHistory for Ferma too.
            calculateTruss();
        } else if (item.type === 'Setka') {
            switchPage('mesh');
            meshWidth.value = item.w;
            meshHeight.value = item.h;
            meshStepX.value = item.sx;
            meshStepY.value = item.sy;
            meshDiameter.value = item.d;

            // Update active diameter button
            document.querySelectorAll('.mesh-diameter-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-val') == item.d);
            });

            calculateMesh();
        } else if (item.type === 'Beton') {
            switchPage('concrete');
            concreteLength.value = item.l;
            concreteWidth.value = item.w;
            concreteHeight.value = item.h;

            // Trigger calculation
            btnCalcConcrete.click();
        } else {
            switchPage('calculator');
            inputDiameter.value = item.diameter;
            inputLength.value = item.length;
            inputCount.value = item.count;

            // Update active diameter button
            diameterBtns.forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-val') == item.diameter);
            });

            calculate();
        }
    }

    function switchPage(pageId) {
        // Update Nav
        navItems.forEach(n => n.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Update Pages
        pages.forEach(p => {
            p.classList.remove('active');
            if (p.id === `page-${pageId}`) {
                p.classList.add('active');
            }
        });
    }

    function clearInputs() {
        inputDiameter.value = '';
        inputLength.value = '';
        inputCount.value = '';
        resultCard.classList.remove('visible-animated');
        resultCard.classList.add('hidden-animated');
        diameterBtns.forEach(b => b.classList.remove('active'));
    }

    // Theme Toggle
    function applyTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${theme}-theme`);
        themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
        localStorage.setItem('armatura_theme', theme);
        currentTheme = theme;
    }

    themeToggle.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Export PDF
    function exportToPDF() {
        const element = document.getElementById('result-card');
        const opt = {
            margin: 1,
            filename: `Armatura_Hisob_${new Date().getTime()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    }

    // Mesh Calculation and Drawing
    function calculateMesh() {
        const w = parseFloat(meshWidth.value);
        const h = parseFloat(meshHeight.value);
        const sx = parseFloat(meshStepX.value) / 1000; // mm to m
        const sy = parseFloat(meshStepY.value) / 1000; // mm to m
        const d = parseFloat(meshDiameter.value);

        if (!w || !h || !sx || !sy || !d) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        const numHor = Math.floor(h / sy) + 1;
        const numVer = Math.floor(w / sx) + 1;

        const totalLen = (numHor * w) + (numVer * h);
        const unitWeight = (d * d) / 162;
        const totalWeight = totalLen * unitWeight;

        animateValue(resMeshLength, 0, totalLen, 1000, 2);
        animateValue(resMeshWeight, 0, totalWeight, 1000, 2);

        meshResultContainer.classList.remove('hidden-animated');
        meshResultContainer.classList.add('visible-animated');

        drawMesh(w, h, sx, sy);
        updateMesh3D(w, h, sx, sy, d);

        saveToHistory({
            type: 'Setka',
            w: w,
            h: h,
            sx: meshStepX.value,
            sy: meshStepY.value,
            d: d,
            weight: totalWeight.toFixed(2),
            date: new Date().toLocaleString()
        });
    }

    function drawMesh(w, h, sx, sy) {
        const containerWidth = meshCanvas.parentElement.clientWidth - 20;
        const canvasW = containerWidth;
        const canvasH = containerWidth; // Keep it square
        meshCanvas.width = canvasW * window.devicePixelRatio;
        meshCanvas.height = canvasH * window.devicePixelRatio;
        meshCanvas.style.width = canvasW + 'px';
        meshCanvas.style.height = canvasH + 'px';
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const padding = 40;
        // Scale factors
        const scale = Math.min((canvasW - padding * 2) / w, (canvasH - padding * 2) / h);
        const drawW = w * scale;
        const drawH = h * scale;
        const startX = (canvasW - drawW) / 2;
        const startY = (canvasH - drawH) / 2;

        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvasW, canvasH);

        // Lines style
        ctx.strokeStyle = '#FF9F1C';
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        // Horizontal bars
        for (let y = 0; y <= h; y += sy) {
            const py = startY + y * scale;
            ctx.moveTo(startX, py);
            ctx.lineTo(startX + drawW, py);
        }
        if (h % sy !== 0) {
            ctx.moveTo(startX, startY + drawH);
            ctx.lineTo(startX + drawW, startY + drawH);
        }

        // Vertical bars
        for (let x = 0; x <= w; x += sx) {
            const px = startX + x * scale;
            ctx.moveTo(px, startY);
            ctx.lineTo(px, startY + drawH);
        }
        if (w % sx !== 0) {
            ctx.moveTo(startX + drawW, startY);
            ctx.lineTo(startX + drawW, startY + drawH);
        }
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#fff';
        ctx.font = '12px Outfit';
        ctx.fillText(`${w}m`, startX + drawW / 2 - 10, startY - 10);

        ctx.save();
        ctx.translate(startX - 10, startY + drawH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${h}m`, -10, 0);
        ctx.restore();
    }

    function drawConcrete(l, w, h) {
        const containerWidth = concreteCanvas.parentElement.clientWidth - 20;
        const canvasW = containerWidth;
        const canvasH = containerWidth * 0.7; // 4:3 ratio
        concreteCanvas.width = canvasW * window.devicePixelRatio;
        concreteCanvas.height = canvasH * window.devicePixelRatio;
        concreteCanvas.style.width = canvasW + 'px';
        concreteCanvas.style.height = canvasH + 'px';
        ctxC.scale(window.devicePixelRatio, window.devicePixelRatio);

        const padding = 50;
        // Scale
        const maxDim = Math.max(l, w, h);
        const scale = (canvasW - padding * 2) / (maxDim * 1.5);

        const startX = canvasW / 2 - (l * scale) / 2;
        const startY = canvasH / 2 + (h * scale) / 2;

        ctxC.clearRect(0, 0, canvasW, canvasH);
        ctxC.strokeStyle = '#FF9F1C';
        ctxC.lineWidth = 2;
        ctxC.lineJoin = 'round';

        // Helper to draw projected point
        const project = (px, py, pz) => {
            const isoX = startX + (px - py * 0.5) * scale;
            const isoY = startY - (pz + py * 0.5) * scale;
            return { x: isoX, y: isoY };
        };

        const p1 = project(0, 0, 0);
        const p2 = project(l, 0, 0);
        const p3 = project(l, w, 0);
        const p4 = project(0, w, 0);
        const p5 = project(0, 0, h);
        const p6 = project(l, 0, h);
        const p7 = project(l, w, h);
        const p8 = project(0, w, h);

        // Draw edges
        const drawEdge = (a, b) => {
            ctxC.beginPath();
            ctxC.moveTo(a.x, a.y);
            ctxC.lineTo(b.x, b.y);
            ctxC.stroke();
        };

        ctxC.setLineDash([4, 4]); // Back edges
        ctxC.strokeStyle = 'rgba(255,159,28,0.2)';
        drawEdge(p1, p4);
        drawEdge(p4, p3);
        drawEdge(p4, p8);

        ctxC.setLineDash([]); // Front edges
        ctxC.strokeStyle = '#FF9F1C';
        drawEdge(p1, p2);
        drawEdge(p2, p3);
        drawEdge(p1, p5);
        drawEdge(p2, p6);
        drawEdge(p3, p7);
        drawEdge(p5, p6);
        drawEdge(p6, p7);
        drawEdge(p7, p8);
        drawEdge(p8, p5);

        // Labels
        ctxC.fillStyle = '#fff';
        ctxC.font = '12px Outfit';
        ctxC.fillText(`${l}m`, (p1.x + p2.x) / 2, p1.y + 20);
        ctxC.fillText(`${h}m`, p2.x + 5, (p2.y + p6.y) / 2);
        ctxC.fillText(`${w}m`, (p2.x + p3.x) / 2 + 10, (p2.y + p3.y) / 2 + 10);
    }

    // Truss Calculation and Drawing
    function calculateTruss() {
        const L = parseFloat(trussSpan.value);
        const H = parseFloat(trussHeight.value);
        const N = parseInt(trussPanels.value);
        const type = trussType.value;
        const mainW = parseFloat(trussMainProfile.value);
        const innerW = parseFloat(trussInnerProfile.value);

        if (!L || !H || !N) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        const pW = L / N;
        let totalLenMain = 0;
        let totalLenInner = 0;

        // 1. Chords (Main profiles)
        const topChordSideLen = Math.sqrt(Math.pow(L/2, 2) + Math.pow(H, 2));
        totalLenMain = L + (topChordSideLen * 2);

        // 2. Inner members (Inner profiles)
        for (let i = 0; i <= N; i++) {
            const x = i * pW;
            const h = x <= L/2 ? (H / (L/2)) * x : (H / (L/2)) * (L - x);
            
            // Verticals
            if (i > 0 && i < N) {
                totalLenInner += h;
            }

            // Diagonals based on type
            if (type === 'pratt') {
                if (i < N/2) {
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                } else if (i >= N/2 && i < N) {
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                }
            } else if (type === 'howe') {
                if (i < N/2) {
                    const nextH = (H/(L/2))*((i+1)*pW);
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(nextH, 2));
                } else if (i >= N/2 && i < N) {
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                }
            } else if (type === 'warren') {
                if (i < N) {
                    const nextH = (i + 1) * pW <= L/2 ? (H/(L/2))*(i+1)*pW : (H/(L/2))*(L-(i+1)*pW);
                    if (i % 2 === 0) {
                        totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(nextH, 2));
                    } else {
                        totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                    }
                }
            } else if (type === 'triangle') {
                if (i > 0 && i < N && i !== N/2) {
                    totalLenInner += Math.sqrt(Math.pow(Math.abs(L/2 - x), 2) + Math.pow(H, 2));
                }
            }
        }

        const totalWeight = (totalLenMain * mainW / 1000) + (totalLenInner * innerW / 1000);
        const totalMetr = (totalLenMain + totalLenInner) / 1000;

        animateValue(resTrussWeight, 0, totalWeight, 1000, 2);
        animateValue(resTrussLength, 0, totalMetr, 1000, 2);

        trussResultContainer.classList.remove('hidden-animated');
        trussResultContainer.classList.add('visible-animated');

        drawTrussSVG(L, H, N, type);
        updateTruss3D(L, H, N, type);

        saveToHistory({
            type: 'Ferma',
            info: `${L}x${H}mm (${type.toUpperCase()})`,
            weight: totalWeight.toFixed(2),
            date: new Date().toLocaleString()
        });
    }

    function drawTrussSVG(L, H, N, type) {
        const padding = 50;
        const svgW = 800;
        const svgH = 400;
        const scale = (svgW - padding * 2) / L;
        const startY = svgH - padding - 20;
        const startX = padding;

        let svgHtml = `<svg viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="background: white;">`;
        const line = (x1, y1, x2, y2, color = 'red', width = 3) => {
            return `<line x1="${startX + x1 * scale}" y1="${startY - y1 * scale}" x2="${startX + x2 * scale}" y2="${startY - y2 * scale}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" />`;
        };

        const pW = L / N;
        svgHtml += line(0, 0, L, 0, 'red', 4); // Bottom chord
        svgHtml += line(0, 0, L/2, H, 'red', 4); // Left top
        svgHtml += line(L/2, H, L, 0, 'red', 4); // Right top

        for (let i = 0; i <= N; i++) {
            const x = i * pW;
            const h = x <= L/2 ? (H / (L/2)) * x : (H / (L/2)) * (L - x);
            if (i > 0 && i < N) svgHtml += line(x, 0, x, h, 'red', 2);
            if (type === 'pratt') {
                if (i < N/2) svgHtml += line(i * pW, h, (i + 1) * pW, 0, 'red', 2);
                else if (i >= N/2 && i < N) svgHtml += line(i * pW, h, (i - 1) * pW, 0, 'red', 2);
            } else if (type === 'howe') {
                if (i < N/2) svgHtml += line((i + 1) * pW, (H/(L/2))*((i+1)*pW), i * pW, 0, 'red', 2);
                else if (i >= N/2 && i < N) svgHtml += line(i * pW, h, (i + 1) * pW, 0, 'red', 2);
            } else if (type === 'warren') {
                if (i < N) {
                    const nextH = (i + 1) * pW <= L/2 ? (H/(L/2))*(i+1)*pW : (H/(L/2))*(L-(i+1)*pW);
                    if (i % 2 === 0) svgHtml += line(i * pW, 0, (i + 1) * pW, nextH, 'red', 2);
                    else svgHtml += line(i * pW, h, (i + 1) * pW, 0, 'red', 2);
                }
            } else if (type === 'triangle') {
                if (i > 0 && i < N && i !== N/2) svgHtml += line(x, 0, L/2, H, 'red', 1.5);
            }
        }
        svgHtml += `<text x="${svgW/2}" y="${svgH-5}" fill="#4a90e2" font-size="14" text-anchor="middle">L = ${L}mm | H = ${H}mm</text></svg>`;
        trussSvgContainer.innerHTML = svgHtml;
    }

    function drawConcrete(l, w, h) {
        const canvas = document.getElementById('concreteCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const cw = canvas.parentElement.clientWidth;
        canvas.width = cw;
        canvas.height = 300;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#FF9F1C';
        ctx.lineWidth = 2;
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 50; 

        // Simple Isometric projection
        const project = (x, y, z) => {
            return {
                x: centerX + (x - z) * 0.8 * scale,
                y: centerY + (x + z) * 0.4 * scale - y * scale
            };
        };

        const p1 = project(-w/2, 0, -l/2);
        const p2 = project(w/2, 0, -l/2);
        const p3 = project(w/2, 0, l/2);
        const p4 = project(-w/2, 0, l/2);
        const p5 = project(-w/2, h, -l/2);
        const p6 = project(w/2, h, -l/2);
        const p7 = project(w/2, h, l/2);
        const p8 = project(-w/2, h, l/2);

        const drawLine = (a, b) => {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        };

        [ [p1,p2], [p2,p3], [p3,p4], [p4,p1], [p5,p6], [p6,p7], [p7,p8], [p8,p5], [p1,p5], [p2,p6], [p3,p7], [p4,p8] ].forEach(edge => drawLine(edge[0], edge[1]));
    }

    function drawRebarVisual(length, diam) {
        const canvas = document.getElementById('rebarCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const cw = canvas.parentElement.clientWidth;
        canvas.width = cw;
        canvas.height = 150;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const y = canvas.height / 2;
        const margin = 40;
        const drawLen = canvas.width - margin * 2;
        
        ctx.strokeStyle = '#555';
        ctx.lineWidth = Math.max(2, diam / 2);
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(margin + drawLen, y);
        ctx.stroke();
        
        // Ridges
        ctx.lineWidth = 1;
        for (let i = 0; i < drawLen; i += 10) {
            ctx.beginPath();
            ctx.moveTo(margin + i, y - 5);
            ctx.lineTo(margin + i + 5, y + 5);
            ctx.stroke();
        }

        ctx.fillStyle = '#4a90e2';
        ctx.font = '14px Outfit';
        ctx.textAlign = 'center';
        ctx.fillText(`Ø${diam}mm | L = ${length}m`, canvas.width / 2, y + 30);
    }

    function init3DScene(key, height = 300) {
        try {
            const s = scenes[key];
            if (!s || !s.container) return;

            // If already exists, just handle potential resize
            if (s.scene) {
                const w = s.container.clientWidth;
                if (w > 0 && s.renderer) {
                    s.renderer.setSize(w, height);
                    s.camera.aspect = w / height;
                    s.camera.updateProjectionMatrix();
                }
                return;
            }

            s.scene = new THREE.Scene();
            s.scene.background = new THREE.Color(0x0a0a0b);
            
            const w = s.container.clientWidth || 350;
            s.camera = new THREE.PerspectiveCamera(75, w / height, 1, 100000);
            s.camera.position.set(1000, 1000, 2000);

            s.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            s.renderer.setPixelRatio(window.devicePixelRatio);
            s.renderer.setSize(w, height);
            s.container.innerHTML = ''; 
            s.container.appendChild(s.renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            s.scene.add(ambientLight);
            const pointLight = new THREE.PointLight(0xffffff, 1.0);
            pointLight.position.set(2000, 3000, 2000);
            s.scene.add(pointLight);

            const grid = new THREE.GridHelper(10000, 50, 0x444444, 0x222222);
            grid.position.y = -50;
            s.scene.add(grid);

            if (THREE.OrbitControls) {
                s.controls = new THREE.OrbitControls(s.camera, s.renderer.domElement);
                s.controls.enableDamping = true;
            }

            s.group = new THREE.Group();
            s.scene.add(s.group);

            const animate = () => {
                if (!s.scene) return;
                requestAnimationFrame(animate);
                if (s.controls) s.controls.update();
                s.renderer.render(s.scene, s.camera);
            };
            animate();
        } catch (e) {
            console.error(`3D Init error (${key}):`, e);
        }
    }

    function updateTruss3D(L, H, N, type) {
        init3DScene('truss', 400);
        const s = scenes.truss;
        if (!s || !s.group) return;
        while(s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 30 });
        const thickness = 4; // Approximately 40mm profile in scale

        const addMember = (x1, y1, x2, y2) => {
            const start = new THREE.Vector3(x1 - L/2, y1, 0);
            const end = new THREE.Vector3(x2 - L/2, y2, 0);
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            if (length < 1) return;
            const geometry = new THREE.BoxGeometry(thickness, thickness, length);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(start);
            mesh.position.add(direction.clone().multiplyScalar(0.5));
            mesh.lookAt(end);
            s.group.add(mesh);
        };

        const pW = L / N;
        addMember(0, 0, L, 0);
        addMember(0, 0, L/2, H);
        addMember(L/2, H, L, 0);

        for (let i = 0; i <= N; i++) {
            const x = i * pW;
            const h = x <= L/2 ? (H / (L/2)) * x : (H / (L/2)) * (L - x);
            if (i > 0 && i < N) addMember(x, 0, x, h);
            if (type === 'pratt') {
                if (i < N/2) addMember(i * pW, h, (i + 1) * pW, 0);
                else if (i >= N/2 && i < N) addMember(i * pW, h, (i - 1) * pW, 0);
            } else if (type === 'howe') {
                if (i < N/2) addMember((i + 1) * pW, (H/(L/2))*((i+1)*pW), i * pW, 0);
                else if (i >= N/2 && i < N) addMember(i * pW, h, (i + 1) * pW, 0);
            } else if (type === 'warren') {
                if (i < N) {
                    const nextH = (i + 1) * pW <= L/2 ? (H/(L/2))*(i+1)*pW : (H/(L/2))*(L-(i+1)*pW);
                    if (i % 2 === 0) addMember(i * pW, 0, (i + 1) * pW, nextH);
                    else addMember(i * pW, h, (i + 1) * pW, 0);
                }
            } else if (type === 'triangle') {
                if (i > 0 && i < N && i !== N/2) addMember(x, 0, L/2, H);
            }
        }

        const maxDim = Math.max(L, H);
        if (s.camera) s.camera.position.set(0, H/2 + 500, maxDim * 1.5);
        if (s.controls) { s.controls.target.set(0, H/2, 0); s.controls.update(); }
    }

    function updateConcrete3D(l, w, h) {
        init3DScene('concrete', 300);
        const s = scenes.concrete;
        if (!s || !s.group) return;
        while(s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const geometry = new THREE.BoxGeometry(w * 100, h * 100, l * 100);
        const material = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 10 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = (h * 100) / 2;
        s.group.add(mesh);

        const maxDim = Math.max(l, w, h) * 100;
        if (s.camera) s.camera.position.set(maxDim * 1.0, maxDim * 1.0, maxDim * 1.0);
        if (s.controls) { s.controls.target.set(0, (h*100)/2, 0); s.controls.update(); }
    }

    function updateRebar3D(length, diam) {
        init3DScene('rebar', 300);
        const s = scenes.rebar;
        if (!s || !s.group) return;
        while(s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const geometry = new THREE.CylinderGeometry(diam / 20, diam / 20, length * 100, 16);
        const material = new THREE.MeshPhongMaterial({ color: 0x555555, shininess: 50 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = Math.PI / 2;
        s.group.add(mesh);

        if (s.camera) s.camera.position.set(0, 500, length * 50);
        if (s.controls) { s.controls.target.set(0, 0, 0); s.controls.update(); }
    }

    function updateMesh3D(w, h, sx, sy, d) {
        init3DScene('mesh', 350);
        const s = scenes.mesh;
        if (!s || !s.group) return;
        while(s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const material = new THREE.MeshPhongMaterial({ color: 0x555555, shininess: 50 });
        const radius = d / 20; // 12mm -> 0.6 units (Correct scale 1m=100u)

        // Horizontal bars
        for (let y = 0; y <= h; y += sy) {
            const geom = new THREE.CylinderGeometry(radius, radius, w * 100, 8);
            const mesh = new THREE.Mesh(geom, material);
            mesh.rotation.z = Math.PI / 2;
            mesh.position.set(0, 0, (y - h/2) * 100);
            s.group.add(mesh);
        }

        // Vertical bars
        for (let x = 0; x <= w; x += sx) {
            const geom = new THREE.CylinderGeometry(radius, radius, h * 100, 8);
            const mesh = new THREE.Mesh(geom, material);
            mesh.rotation.x = Math.PI / 2;
            mesh.position.set((x - w/2) * 100, 0, 0);
            s.group.add(mesh);
        }

        const maxDim = Math.max(w, h) * 100;
        if (s.camera) s.camera.position.set(maxDim * 0.8, maxDim * 0.8, maxDim * 0.8);
        if (s.controls) { s.controls.target.set(0, 0, 0); s.controls.update(); }
    }

    // Universal Tab Switching Logic
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const parent = tab.parentElement;
            parent.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-view-target') || (tab.getAttribute('data-view') === '2d' ? 'truss-2d-view' : 'truss-3d-view');
            const container = parent.parentElement;
            container.querySelectorAll('.drawing-card, .rebar-visual-container').forEach(v => v.classList.add('hidden'));
            
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.remove('hidden');

            if (targetId.includes('3d')) {
                const key = tab.getAttribute('data-calc') || (targetId.startsWith('rebar') ? 'rebar' : (targetId.startsWith('concrete') ? 'concrete' : 'truss'));
                const h = key === 'truss' ? 400 : 350;
                
                // Ensure it's initialized and resized
                setTimeout(() => {
                    init3DScene(key, h);
                    const s = scenes[key];
                    if (s && s.renderer && s.container) {
                        const w = s.container.clientWidth;
                        if (w > 0) {
                            s.renderer.setSize(w, h);
                            s.camera.aspect = w / h;
                            s.camera.updateProjectionMatrix();
                        }
                    }
                }, 50);
            }
        });
    });

    // Event Listeners
    btnCalcTruss.addEventListener('click', calculateTruss);
    btnExportTruss.addEventListener('click', () => {
        const element = document.getElementById('truss-result-container');
        const opt = {
            margin: 0.5,
            filename: `Ferma_Loyihasi_${new Date().getTime()}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    });

    btnCalculate.addEventListener('click', calculate);
    btnClear.addEventListener('click', clearInputs);
    btnExport.addEventListener('click', exportToPDF);

    btnCalcMesh.addEventListener('click', calculateMesh);

    btnCalcConcrete.addEventListener('click', () => {
        const l = parseFloat(concreteLength.value);
        const w = parseFloat(concreteWidth.value);
        const h = parseFloat(concreteHeight.value);

        if (!l || !w || !h) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        const volume = l * w * h;
        const weight = volume * 2400; 
        
        animateValue(resConcreteVolume, 0, volume, 1000, 3);
        animateValue(resConcreteWeight, 0, weight, 1000, 2);

        concreteResultContainer.classList.remove('hidden-animated');
        concreteResultContainer.classList.add('visible-animated');

        drawConcrete(l, w, h);
        updateConcrete3D(l, w, h);

        saveToHistory({
            type: 'Beton',
            l: l,
            w: w,
            h: h,
            volume: volume.toFixed(3),
            date: new Date().toLocaleString()
        });
    });

    btnClearConcrete.addEventListener('click', () => {
        concreteLength.value = '';
        concreteWidth.value = '';
        concreteHeight.value = '';
        concreteResultContainer.classList.remove('visible-animated');
        concreteResultContainer.classList.add('hidden-animated');
    });

    btnClearHistory.addEventListener('click', () => {
        if (confirm('Tarixni tozalashni xohlaysizmi?')) {
            history = [];
            localStorage.setItem('armatura_history', JSON.stringify(history));
            renderHistory();
        }
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        Object.keys(scenes).forEach(key => {
            const s = scenes[key];
            if (s.scene && s.container && s.renderer) {
                // Only resize if visible
                const parent = s.container.closest('.drawing-card');
                if (parent && !parent.classList.contains('hidden')) {
                    const w = s.container.clientWidth;
                    const h = key === 'truss' ? 400 : 350;
                    if (w > 0) {
                        s.renderer.setSize(w, h);
                        s.camera.aspect = w / h;
                        s.camera.updateProjectionMatrix();
                    }
                }
            }
        });
    });
});
