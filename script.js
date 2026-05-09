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
    if (concreteCanvas) ctxC = concreteCanvas.getContext('2d');

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
    if (meshCanvas) ctx = meshCanvas.getContext('2d');

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

    // Karkaz Elements
    const karkazLength = document.getElementById('karkaz-length');
    const karkazWidth = document.getElementById('karkaz-width');
    const karkazHeight = document.getElementById('karkaz-height');
    const karkazStep = document.getElementById('karkaz-step');
    const karkazMainDiam = document.getElementById('karkaz-main-diam');
    const karkazMainCount = document.getElementById('karkaz-main-count');
    const karkazStirrupDiam = document.getElementById('karkaz-stirrup-diam');
    const btnCalcKarkaz = document.getElementById('btn-calc-karkaz');
    const resKarkazWeight = document.getElementById('res-karkaz-weight');
    const resKarkazMainWeight = document.getElementById('res-karkaz-main-weight');
    const resKarkazStirrupWeight = document.getElementById('res-karkaz-stirrup-weight');
    const resKarkazStirrupCount = document.getElementById('res-karkaz-stirrup-count');
    const karkazEndOffset = document.getElementById('karkaz-end-offset');
    const karkazResultContainer = document.getElementById('karkaz-result-container');
    const karkazCanvas = document.getElementById('karkazCanvas');
    let ctxK;
    if (karkazCanvas) ctxK = karkazCanvas.getContext('2d');

    const karkazVarToggle = document.getElementById('karkaz-var-step-toggle');
    const karkazVarInputs = document.getElementById('karkaz-var-step-inputs');
    const karkazZoneLen = document.getElementById('karkaz-zone-len');
    const karkazZoneStep = document.getElementById('karkaz-zone-step');

    // Rama Elements
    const ramaFloors = document.getElementById('rama-floors');
    const ramaCols = document.getElementById('rama-cols');
    const ramaColH = document.getElementById('rama-col-h');

    const ramaMainDiam = document.getElementById('rama-main-diam');
    const ramaStirrupDiam = document.getElementById('rama-stirrup-diam');
    const btnCalcRama = document.getElementById('btn-calc-rama');
    const resRamaWeight = document.getElementById('res-rama-weight');
    const resRamaConcrete = document.getElementById('res-rama-concrete');
    const resRamaMain = document.getElementById('res-rama-main');
    const resRamaStirrup = document.getElementById('res-rama-stirrup');
    const ramaResultContainer = document.getElementById('rama-result-container');

    // Plita Elements
    const plitaLength = document.getElementById('plita-length');
    const plitaWidth = document.getElementById('plita-width');
    const plitaThick = document.getElementById('plita-thick');
    const plitaStep = document.getElementById('plita-step');
    const plitaDiam = document.getElementById('plita-diam');
    const plitaProtection = document.getElementById('plita-protection');
    const btnCalcPlita = document.getElementById('btn-calc-plita');
    const resPlitaWeight = document.getElementById('res-plita-weight');
    const resPlitaConcrete = document.getElementById('res-plita-concrete');
    const resPlitaLength = document.getElementById('res-plita-length');
    const plitaResultContainer = document.getElementById('plita-result-container');
    const plitaCanvas = document.getElementById('plitaCanvas');
    let ctxP;
    if (plitaCanvas) ctxP = plitaCanvas.getContext('2d');

    // Fundament Elements
    const fundamentType = document.getElementById('fundament-type');
    const fundamentColInputs = document.getElementById('fundament-col-inputs');
    const fundamentWallInputs = document.getElementById('fundament-wall-inputs');
    const fundamentColRebarInputs = document.getElementById('fundament-col-rebar-inputs');
    const fundamentWallThick = document.getElementById('fundament-wall-thick');
    const fundamentLength = document.getElementById('fundament-length');
    const fundamentWidth = document.getElementById('fundament-width');
    const fundamentThick = document.getElementById('fundament-thick');
    const fundamentDepth = document.getElementById('fundament-depth');
    const fundamentColSize = document.getElementById('fundament-col-size');
    const fundamentColH = document.getElementById('fundament-col-h');
    const fundamentMainDiam = document.getElementById('fundament-main-diam');
    const fundamentMainStep = document.getElementById('fundament-main-step');
    const fundamentColDiam = document.getElementById('fundament-col-diam');
    const fundamentStirrupDiam = document.getElementById('fundament-stirrup-diam');
    const fundamentStirrupLabel = document.getElementById('fundament-stirrup-label');
    const btnCalcFundament = document.getElementById('btn-calc-fundament');
    const fundamentResultContainer = document.getElementById('fundament-result-container');
    const resFundamentSoil = document.getElementById('res-fundament-soil');
    const resFundamentConcrete = document.getElementById('res-fundament-concrete');
    const resFundamentMeshWeight = document.getElementById('res-fundament-mesh-weight');
    const resItemCol = document.getElementById('res-item-col');
    const resLabelCol = document.getElementById('res-label-col');
    const resFundamentColWeight = document.getElementById('res-fundament-col-weight');
    const resFundamentSand = document.getElementById('res-fundament-sand');
    const resFundamentGravel = document.getElementById('res-fundament-gravel');

    if (fundamentType) {
        fundamentType.addEventListener('change', () => {
            const type = fundamentType.value;
            if (type === 'isolated') {
                fundamentColInputs.style.display = 'block';
                fundamentWallInputs.style.display = 'none';
                fundamentColRebarInputs.style.display = 'flex';
                fundamentStirrupLabel.textContent = "Ustun Xomut Ø (mm)";
                resItemCol.style.display = 'flex';
                resLabelCol.textContent = "Ustun armaturasi";
            } else if (type === 'strip') {
                fundamentColInputs.style.display = 'none';
                fundamentWallInputs.style.display = 'block';
                fundamentColRebarInputs.style.display = 'flex';
                fundamentStirrupLabel.textContent = "Bog'lovchi Xomut Ø (mm)";
                resItemCol.style.display = 'flex';
                resLabelCol.textContent = "Devor armaturasi";
            } else if (type === 'raft') {
                fundamentColInputs.style.display = 'none';
                fundamentWallInputs.style.display = 'none';
                fundamentColRebarInputs.style.display = 'none';
                resItemCol.style.display = 'none';
            }
        });
    }

    if (karkazVarToggle) {
        karkazVarToggle.addEventListener('change', () => {
            karkazVarInputs.classList.toggle('hidden', !karkazVarToggle.checked);
        });
    }

    // 3D View variables
    let scenes = {
        truss: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('truss-3d-container') },
        concrete: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('concrete-3d-container') },
        rebar: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('rebar-3d-container') },
        mesh: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('mesh-3d-container') },
        karkaz: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('karkaz-3d-container') },
        rama: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('rama-3d-container') },
        plita: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('plita-3d-container') },
        fundament: { scene: null, camera: null, renderer: null, controls: null, group: null, container: document.getElementById('fundament-3d-container') }
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
        updateRebar3D(l, d, n);

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
            if (item.type === 'Rama') {
                return `
                    <div class="glass-card history-card clickable-history" data-index="${index}">
                        <div class="history-info">
                            <h4>Rama: ${item.info}</h4>
                            <p>${item.date}</p>
                        </div>
                        <div class="history-weight">
                            <span class="weight-val">${item.weight} kg</span>
                            <span class="res-unit">jami</span>
                        </div>
                    </div>
                `;
            }
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
            if (item.type === 'Karkaz') {
                return `
                    <div class="glass-card history-card clickable-history" data-index="${index}">
                        <div class="history-info">
                            <h4>Karkaz: ${item.l}x${item.w}x${item.h}m (Ø${item.md})</h4>
                            <p>${item.date}</p>
                        </div>
                        <div class="history-weight">
                            <span class="weight-val">${item.weight} kg</span>
                            <span class="res-unit">jami</span>
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
        } else if (item.type === 'Karkaz') {
            switchPage('karkaz');
            karkazLength.value = item.l;
            karkazWidth.value = item.w;
            karkazHeight.value = item.h;
            karkazStep.value = item.s;
            karkazMainDiam.value = item.md;
            karkazMainCount.value = item.mc;
            karkazStirrupDiam.value = item.sd;
            calculateKarkaz();
        } else if (item.type === 'Rama') {
            switchPage('rama');
            // Restore rama inputs if needed, or just calculate
            btnCalcRama.click();
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

        const protrusion = 0.2; // 200mm protrusion

        if (w <= protrusion * 2 || h <= protrusion * 2) {
            alert('Eni va bo\'yi 400mm dan katta bo\'lishi kerak!');
            return;
        }

        // Calculate number of bars with 200mm offset from each side
        const numHor = Math.floor((h - protrusion * 2) / sy + 0.001) + 1;
        const numVer = Math.floor((w - protrusion * 2) / sx + 0.001) + 1;

        const totalLen = (numHor * w) + (numVer * h);
        const unitWeight = (d * d) / 162;
        const totalWeight = totalLen * unitWeight;

        animateValue(resMeshLength, 0, totalLen, 1000, 2);
        animateValue(resMeshWeight, 0, totalWeight, 1000, 2);

        meshResultContainer.classList.remove('hidden-animated');
        meshResultContainer.classList.add('visible-animated');

        drawMesh(w, h, sx, sy, protrusion);
        updateMesh3D(w, h, sx, sy, d, protrusion);

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

    function drawMesh(w, h, sx, sy, protrusion = 0) {
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

        // Horizontal bars (running along W, distributed along H)
        const numHor = Math.floor((h - protrusion * 2) / sy + 0.001) + 1;
        const totalGridH = (numHor - 1) * sy;
        const startYOffset = (h - totalGridH) / 2;

        for (let i = 0; i < numHor; i++) {
            const y = startYOffset + i * sy;
            const py = startY + y * scale;
            ctx.moveTo(startX, py);
            ctx.lineTo(startX + drawW, py);
        }

        // Vertical bars (running along H, distributed along W)
        const numVer = Math.floor((w - protrusion * 2) / sx + 0.001) + 1;
        const totalGridW = (numVer - 1) * sx;
        const startXOffset = (w - totalGridW) / 2;

        for (let i = 0; i < numVer; i++) {
            const x = startXOffset + i * sx;
            const px = startX + x * scale;
            ctx.moveTo(px, startY);
            ctx.lineTo(px, startY + drawH);
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
        const count = parseInt(document.getElementById('truss-count').value) || 1;
        const dist = parseFloat(document.getElementById('truss-dist').value) || 0;

        if (!L || !H || !N) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        const pW = L / N;
        let totalLenMain = 0;
        let totalLenInner = 0;

        // 1. Chords (Main profiles)
        const topChordSideLen = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(H, 2));
        totalLenMain = L + (topChordSideLen * 2);

        // 2. Inner members (Inner profiles)
        for (let i = 0; i <= N; i++) {
            const x = i * pW;
            const h = x <= L / 2 ? (H / (L / 2)) * x : (H / (L / 2)) * (L - x);

            // Verticals
            if (i > 0 && i < N) {
                totalLenInner += h;
            }

            // Diagonals based on type
            if (type === 'pratt') {
                if (i < N / 2) {
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                } else if (i >= N / 2 && i < N) {
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                }
            } else if (type === 'howe') {
                if (i < N / 2) {
                    const nextH = (H / (L / 2)) * ((i + 1) * pW);
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(nextH, 2));
                } else if (i >= N / 2 && i < N) {
                    totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                }
            } else if (type === 'warren') {
                if (i < N) {
                    const nextH = (i + 1) * pW <= L / 2 ? (H / (L / 2)) * (i + 1) * pW : (H / (L / 2)) * (L - (i + 1) * pW);
                    if (i % 2 === 0) {
                        totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(nextH, 2));
                    } else {
                        totalLenInner += Math.sqrt(Math.pow(pW, 2) + Math.pow(h, 2));
                    }
                }
            } else if (type === 'triangle') {
                if (i > 0 && i < N && i !== N / 2) {
                    totalLenInner += Math.sqrt(Math.pow(Math.abs(L / 2 - x), 2) + Math.pow(H, 2));
                }
            }
        }

        const totalWeight = ((totalLenMain * mainW / 1000) + (totalLenInner * innerW / 1000)) * count;
        const totalMetr = ((totalLenMain + totalLenInner) / 1000) * count;

        animateValue(resTrussWeight, 0, totalWeight, 1000, 2);
        animateValue(resTrussLength, 0, totalMetr, 1000, 2);

        trussResultContainer.classList.remove('hidden-animated');
        trussResultContainer.classList.add('visible-animated');

        drawTrussSVG(L, H, N, type);
        updateTruss3D(L, H, N, type, count, dist * 1000); // dist converted to mm for 3D

        saveToHistory({
            type: 'Ferma',
            info: `${count}ta ${L}x${H}mm (${type.toUpperCase()})`,
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
        svgHtml += line(0, 0, L / 2, H, 'red', 4); // Left top
        svgHtml += line(L / 2, H, L, 0, 'red', 4); // Right top

        for (let i = 0; i <= N; i++) {
            const x = i * pW;
            const h = x <= L / 2 ? (H / (L / 2)) * x : (H / (L / 2)) * (L - x);
            if (i > 0 && i < N) svgHtml += line(x, 0, x, h, 'red', 2);
            if (type === 'pratt') {
                if (i > 0 && i < N / 2) svgHtml += line(i * pW, h, (i + 1) * pW, 0, 'red', 2);
                else if (i > N / 2 && i < N) svgHtml += line(i * pW, h, (i - 1) * pW, 0, 'red', 2);
            } else if (type === 'howe') {
                if (i > 0 && i < N / 2) svgHtml += line((i + 1) * pW, (H / (L / 2)) * ((i + 1) * pW), i * pW, 0, 'red', 2);
                else if (i >= N / 2 && i < N - 1) svgHtml += line(i * pW, h, (i + 1) * pW, 0, 'red', 2);
            } else if (type === 'warren') {
                if (i > 0 && i < N - 1) {
                    const nextH = (i + 1) * pW <= L / 2 ? (H / (L / 2)) * (i + 1) * pW : (H / (L / 2)) * (L - (i + 1) * pW);
                    if (i % 2 === 0) svgHtml += line(i * pW, 0, (i + 1) * pW, nextH, 'red', 2);
                    else svgHtml += line(i * pW, h, (i + 1) * pW, 0, 'red', 2);
                }
            } else if (type === 'triangle') {
                if (i > 0 && i < N && i !== N / 2) svgHtml += line(x, 0, L / 2, H, 'red', 1.5);
            }
        }
        svgHtml += `<text x="${svgW / 2}" y="${svgH - 5}" fill="#4a90e2" font-size="14" text-anchor="middle">L = ${L}mm | H = ${H}mm</text></svg>`;
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

        const p1 = project(-w / 2, 0, -l / 2);
        const p2 = project(w / 2, 0, -l / 2);
        const p3 = project(w / 2, 0, l / 2);
        const p4 = project(-w / 2, 0, l / 2);
        const p5 = project(-w / 2, h, -l / 2);
        const p6 = project(w / 2, h, -l / 2);
        const p7 = project(w / 2, h, l / 2);
        const p8 = project(-w / 2, h, l / 2);

        const drawLine = (a, b) => {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        };

        [[p1, p2], [p2, p3], [p3, p4], [p4, p1], [p5, p6], [p6, p7], [p7, p8], [p8, p5], [p1, p5], [p2, p6], [p3, p7], [p4, p8]].forEach(edge => drawLine(edge[0], edge[1]));
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

    // Karkaz Calculation and Visualization
    function calculateKarkaz() {
        const l = parseFloat(karkazLength.value);
        const w = parseFloat(karkazWidth.value);
        const h = parseFloat(karkazHeight.value);
        const step = parseFloat(karkazStep.value) / 1000;
        const md = parseFloat(karkazMainDiam.value);
        const mc = parseInt(karkazMainCount.value);
        const sd = parseFloat(karkazStirrupDiam.value);
        const endOff = parseFloat(karkazEndOffset.value) / 1000;

        // Variable step inputs
        const isVarStep = karkazVarToggle.checked;
        const zoneLen = parseFloat(karkazZoneLen.value);
        const zoneStep = parseFloat(karkazZoneStep.value) / 1000;

        if (!l || !w || !h || !step || !md || !mc || !sd) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        const mainUnitWeight = (md * md) / 162;
        const stirrupUnitWeight = (sd * sd) / 162;

        const mainWeight = l * mc * mainUnitWeight;
        const stirrupPerimeter = 2 * (w + h);

        let stirrupCount = 0;
        const stirrupPositions = [];

        // Calculation with end offset
        const effectiveL = l - (endOff * 2);

        if (effectiveL <= 0) {
            alert('Chetki masofa karkaz uzunligidan katta bo‘lishi mumkin emas!');
            return;
        }

        if (isVarStep && zoneLen > 0 && zoneStep > 0) {
            // End zones
            for (let pos = endOff; pos <= zoneLen + endOff; pos += zoneStep) {
                stirrupPositions.push(pos);
            }
            for (let pos = l - endOff; pos >= l - zoneLen - endOff; pos -= zoneStep) {
                if (!stirrupPositions.some(p => Math.abs(p - pos) < 0.001)) stirrupPositions.push(pos);
            }
            // Middle zone
            const midStart = endOff + zoneLen + step;
            const midEnd = l - endOff - zoneLen - step;
            for (let pos = midStart; pos <= midEnd; pos += step) {
                if (!stirrupPositions.some(p => Math.abs(p - pos) < 0.001)) stirrupPositions.push(pos);
            }
        } else {
            const count = Math.floor(effectiveL / step + 0.001) + 1;
            for (let i = 0; i < count; i++) {
                stirrupPositions.push(endOff + i * step);
            }
        }

        stirrupCount = stirrupPositions.length;
        const stirrupWeight = stirrupPerimeter * stirrupCount * stirrupUnitWeight;
        const totalWeight = mainWeight + stirrupWeight;

        animateValue(resKarkazWeight, 0, totalWeight, 1000, 2);
        animateValue(resKarkazMainWeight, 0, mainWeight, 1000, 2);
        animateValue(resKarkazStirrupWeight, 0, stirrupWeight, 1000, 2);
        animateValue(resKarkazStirrupCount, 0, stirrupCount, 1000, 0);

        karkazResultContainer.classList.remove('hidden-animated');
        karkazResultContainer.classList.add('visible-animated');

        drawKarkaz2D(l, w, h, stirrupPositions);
        updateKarkaz3D(l, w, h, stirrupPositions, md, mc, sd);

        saveToHistory({
            type: 'Karkaz',
            l: l,
            w: w,
            h: h,
            s: karkazStep.value,
            md: md,
            mc: mc,
            sd: sd,
            isVar: isVarStep,
            zL: zoneLen,
            zS: zoneStep * 1000,
            weight: totalWeight.toFixed(2),
            date: new Date().toLocaleString()
        });
    }

    function drawKarkaz2D(l, w, h, stirrupPositions) {
        if (!ctxK) return;
        const cw = karkazCanvas.parentElement.clientWidth;
        karkazCanvas.width = cw;
        karkazCanvas.height = 250;
        ctxK.clearRect(0, 0, cw, karkazCanvas.height);

        const padding = 40;
        const drawH = 100;
        const drawL = cw - padding * 2;
        const startX = padding;
        const startY = (karkazCanvas.height - drawH) / 2;

        ctxK.strokeStyle = '#FF9F1C';
        ctxK.lineWidth = 2;

        // Draw Main bars
        ctxK.beginPath();
        ctxK.moveTo(startX, startY);
        ctxK.lineTo(startX + drawL, startY);
        ctxK.moveTo(startX, startY + drawH);
        ctxK.lineTo(startX + drawL, startY + drawH);
        ctxK.stroke();

        // Draw Stirrups
        ctxK.lineWidth = 1;
        ctxK.strokeStyle = '#888';

        stirrupPositions.forEach(pos => {
            const x = startX + (pos / l) * drawL;
            ctxK.beginPath();
            ctxK.moveTo(x, startY - 5);
            ctxK.lineTo(x, startY + drawH + 5);
            ctxK.stroke();
        });

        ctxK.fillStyle = '#fff';
        ctxK.font = '14px Outfit';
        ctxK.textAlign = 'center';
        ctxK.fillText(`L = ${l}m | ${w}x${h}m | Ø${karkazMainDiam.value}mm`, cw / 2, startY + drawH + 30);
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
            s.scene.background = new THREE.Color(0x121214);

            let w = s.container.clientWidth;
            if (w <= 0) w = s.container.parentElement ? s.container.parentElement.clientWidth : 350;
            if (w <= 0) w = 350;

            s.camera = new THREE.PerspectiveCamera(75, w / height, 1, 100000);
            s.camera.position.set(1000, 1000, 1000);

            s.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            s.renderer.setPixelRatio(window.devicePixelRatio);
            s.renderer.setSize(w, height);
            s.container.innerHTML = '';
            s.container.appendChild(s.renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
            s.scene.add(ambientLight);

            const lights = [
                { pos: [5000, 5000, 5000], int: 1.0 },
                { pos: [-5000, 5000, -5000], int: 0.5 },
                { pos: [0, -2000, 0], int: 0.3 }
            ];

            lights.forEach(l => {
                const pl = new THREE.PointLight(0xffffff, l.int);
                pl.position.set(...l.pos);
                s.scene.add(pl);
            });

            const grid = new THREE.GridHelper(20000, 40, 0x444444, 0x222222);
            grid.position.y = -50;
            s.scene.add(grid);

            // Robust OrbitControls initialization
            const ControlsProto = THREE.OrbitControls || window.OrbitControls;
            if (ControlsProto) {
                s.controls = new ControlsProto(s.camera, s.renderer.domElement);
                s.controls.enableDamping = true;
                s.controls.dampingFactor = 0.05;
                s.controls.rotateSpeed = 0.6; // Slower rotation
                s.controls.zoomSpeed = 0.8;   // Smoother zoom
                s.controls.panSpeed = 0.5;    // Slower panning
                s.controls.screenSpacePanning = true;
                s.controls.enablePan = true;

                // Touch settings for mobile
                s.controls.enableTouchRotate = true;
                s.controls.touches = {
                    ONE: THREE.TOUCH.ROTATE,
                    TWO: THREE.TOUCH.DOLLY_PAN
                };
            } else {
                console.error("OrbitControls not found!");
            }

            s.group = new THREE.Group();
            s.scene.add(s.group);
            s.cameraInitialSet = false; // Flag to track if camera was already positioned

            const animate = () => {
                if (!s.scene || !s.renderer || !s.container) return;
                const isVisible = s.container.offsetWidth > 0 && s.container.offsetHeight > 0;
                if (isVisible) {
                    if (s.controls) s.controls.update();
                    s.renderer.render(s.scene, s.camera);
                }
                s.animationId = requestAnimationFrame(animate);
            };

            if (s.animationId) cancelAnimationFrame(s.animationId);
            animate();
        } catch (e) {
            console.error(`3D Init error (${key}):`, e);
        }
    }

    function createRebarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Darker background for better contrast in bump map
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 128, 128);

        // Longitudinal ribs (thicker white lines)
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(32, 0); ctx.lineTo(32, 128);
        ctx.moveTo(96, 0); ctx.lineTo(96, 128);
        ctx.stroke();

        // Transverse ribs (thicker and sharper)
        ctx.lineWidth = 10;
        for (let y = 16; y <= 128; y += 32) {
            ctx.beginPath();
            ctx.moveTo(0, y); ctx.quadraticCurveTo(16, y - 12, 32, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(96, y - 8); ctx.quadraticCurveTo(112, y - 20, 128, y - 8);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(32, y + 16); ctx.quadraticCurveTo(64, y + 4, 96, y + 16);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        return texture;
    }

    const rebarBumpMap = createRebarTexture();

    function getRebarMaterial(color) {
        return new THREE.MeshPhongMaterial({
            color: color,
            shininess: 50,
            bumpMap: rebarBumpMap,
            bumpScale: 0.6
        });
    }

    function updateTruss3D(L, H, N, type, count = 1, dist = 6000) {
        init3DScene('truss', 400);
        const s = scenes.truss;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 50 });
        const purlinMat = new THREE.MeshPhongMaterial({ color: 0xcccccc, shininess: 30 }); // Silver/gray for purlins
        const thickness = 50; // 50mm thickness for better visibility

        const addMember = (x1, y1, x2, y2, zOffset) => {
            const start = new THREE.Vector3(x1 - L / 2, y1, zOffset);
            const end = new THREE.Vector3(x2 - L / 2, y2, zOffset);
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
        const startZ = -((count - 1) * dist) / 2;

        for (let c = 0; c < count; c++) {
            const zOffset = startZ + (c * dist);

            addMember(0, 0, L, 0, zOffset);
            addMember(0, 0, L / 2, H, zOffset);
            addMember(L / 2, H, L, 0, zOffset);

            for (let i = 0; i <= N; i++) {
                const x = i * pW;
                const h = x <= L / 2 ? (H / (L / 2)) * x : (H / (L / 2)) * (L - x);
                if (i > 0 && i < N) addMember(x, 0, x, h, zOffset);
                if (type === 'pratt') {
                    if (i > 0 && i < N / 2) addMember(i * pW, h, (i + 1) * pW, 0, zOffset);
                    else if (i > N / 2 && i < N) addMember(i * pW, h, (i - 1) * pW, 0, zOffset);
                } else if (type === 'howe') {
                    if (i > 0 && i < N / 2) addMember((i + 1) * pW, (H / (L / 2)) * ((i + 1) * pW), i * pW, 0, zOffset);
                    else if (i >= N / 2 && i < N - 1) addMember(i * pW, h, (i + 1) * pW, 0, zOffset);
                } else if (type === 'warren') {
                    if (i > 0 && i < N - 1) {
                        const nextH = (i + 1) * pW <= L / 2 ? (H / (L / 2)) * (i + 1) * pW : (H / (L / 2)) * (L - (i + 1) * pW);
                        if (i % 2 === 0) addMember(i * pW, 0, (i + 1) * pW, nextH, zOffset);
                        else addMember(i * pW, h, (i + 1) * pW, 0, zOffset);
                    }
                } else if (type === 'triangle') {
                    if (i > 0 && i < N && i !== N / 2) addMember(x, 0, L / 2, H, zOffset);
                }
            }
        }

        // Draw connecting purlins (Progonlar) if more than 1 truss
        if (count > 1) {
            const connectPurlin = (x, y) => {
                const geometry = new THREE.BoxGeometry(40, 40, dist * (count - 1));
                const mesh = new THREE.Mesh(geometry, purlinMat);
                mesh.position.set(x - L / 2, y, 0);
                s.group.add(mesh);
            };

            // Connect at ridge
            connectPurlin(L / 2, H);
            // Connect at eaves
            connectPurlin(0, 0);
            connectPurlin(L, 0);
            // Connect at nodes
            for (let i = 1; i < N; i++) {
                const x = i * pW;
                const h = x <= L / 2 ? (H / (L / 2)) * x : (H / (L / 2)) * (L - x);
                connectPurlin(x, h);
            }
        }

        const maxDim = Math.max(L, H, (count - 1) * dist);
        if (!s.cameraInitialSet) {
            if (s.camera) s.camera.position.set(maxDim * 0.8, H + maxDim * 0.5, maxDim * 1.0);
            if (s.controls) { s.controls.target.set(0, H / 2, 0); }
            s.cameraInitialSet = true;
        }
        if (s.controls) s.controls.update();
    }


    function updateConcrete3D(l, w, h) {
        init3DScene('concrete', 300);
        const s = scenes.concrete;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const geometry = new THREE.BoxGeometry(w * 100, h * 100, l * 100);
        const material = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 10 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = (h * 100) / 2;
        s.group.add(mesh);

        const maxDim = Math.max(l, w, h) * 100;
        if (!s.cameraInitialSet) {
            if (s.camera) s.camera.position.set(maxDim * 1.0, maxDim * 1.0, maxDim * 1.0);
            if (s.controls) { s.controls.target.set(0, (h * 100) / 2, 0); }
            s.cameraInitialSet = true;
        }
        if (s.controls) s.controls.update();
    }

    function updateRebar3D(length, diam, count = 1) {
        init3DScene('rebar', 300);
        const s = scenes.rebar;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const geometry = new THREE.CylinderGeometry(diam / 20, diam / 20, length * 100, 8); // Reduced segments for performance
        const material = getRebarMaterial(0x555555);

        // Arrange bars in a bundle
        const barsPerRow = Math.ceil(Math.sqrt(count));
        const spacing = diam / 10 + 2; // small gap between bars

        for (let i = 0; i < count; i++) {
            const row = Math.floor(i / barsPerRow);
            const col = i % barsPerRow;

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.z = Math.PI / 2;

            // Adjust texture repeat for length
            const tex = rebarBumpMap.clone();
            tex.repeat.set(1, length * 2);
            mesh.material = mesh.material.clone();
            mesh.material.bumpMap = tex;

            // Offset positions
            const yOffset = (row - (barsPerRow - 1) / 2) * spacing;
            const zOffset = (col - (barsPerRow - 1) / 2) * spacing;
            mesh.position.set(0, yOffset, zOffset);

            s.group.add(mesh);
        }

        const maxDim = Math.max(length * 100, count * spacing);
        if (!s.cameraInitialSet) {
            if (s.camera) s.camera.position.set(0, spacing * barsPerRow + 100, length * 50 + 100);
            if (s.controls) { s.controls.target.set(0, 0, 0); }
            s.cameraInitialSet = true;
        }
        if (s.controls) s.controls.update();
    }

    function updateMesh3D(w, h, sx, sy, d, protrusion = 0) {
        init3DScene('mesh', 350);
        const s = scenes.mesh;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const material = getRebarMaterial(0x555555);
        const radius = d / 20;

        // Horizontal bars (distributed along H)
        const numHor = Math.floor((h - protrusion * 2) / sy + 0.001) + 1;
        const totalGridH = (numHor - 1) * sy;
        const startYOffset = (h - totalGridH) / 2;

        for (let i = 0; i < numHor; i++) {
            const y = startYOffset + i * sy;
            const geom = new THREE.CylinderGeometry(radius, radius, w * 100, 8);
            const mesh = new THREE.Mesh(geom, material);
            mesh.rotation.z = Math.PI / 2;

            const tex = rebarBumpMap.clone();
            tex.repeat.set(1, w * 2);
            mesh.material = material.clone();
            mesh.material.bumpMap = tex;

            mesh.position.set(0, 0, (y - h / 2) * 100);
            s.group.add(mesh);
        }

        // Vertical bars (distributed along W)
        const numVer = Math.floor((w - protrusion * 2) / sx + 0.001) + 1;
        const totalGridW = (numVer - 1) * sx;
        const startXOffset = (w - totalGridW) / 2;

        for (let i = 0; i < numVer; i++) {
            const x = startXOffset + i * sx;
            const geom = new THREE.CylinderGeometry(radius, radius, h * 100, 8);
            const mesh = new THREE.Mesh(geom, material);
            mesh.rotation.x = Math.PI / 2;
            mesh.position.set((x - w / 2) * 100, 0, 0);
            s.group.add(mesh);
        }

        const maxDim = Math.max(w, h) * 100;
        if (!s.cameraInitialSet) {
            if (s.camera) s.camera.position.set(maxDim * 0.8, maxDim * 0.8, maxDim * 0.8);
            if (s.controls) { s.controls.target.set(0, 0, 0); }
            s.cameraInitialSet = true;
        }
        if (s.controls) s.controls.update();
    }

    function updateKarkaz3D(l, w, h, stirrupPositions, md, mc, sd) {
        init3DScene('karkaz', 400);
        const s = scenes.karkaz;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const mainMaterial = getRebarMaterial(0x555555);
        const stirrupMaterial = getRebarMaterial(0xaa0000);
        const concreteMaterial = new THREE.MeshPhongMaterial({
            color: 0x888888,
            transparent: true,
            opacity: 0.2,
            shininess: 10
        });

        const mainRadius = md / 20;
        const stirrupRadius = sd / 20;

        const l100 = l * 100;
        const w100 = w * 100;
        const h100 = h * 100;

        // Concrete Block (Semi-transparent)
        const concreteGeom = new THREE.BoxGeometry(l100, h100, w100);
        const concreteMesh = new THREE.Mesh(concreteGeom, concreteMaterial);
        s.group.add(concreteMesh);

        // Protective layer (e.g. 2.5cm = 2.5 units in our scale)
        const protection = 3.0;
        const innerW = w100 - (protection * 2);
        const innerH = h100 - (protection * 2);

        // Main longitudinal bars along X axis
        const offsetW = (innerW / 2) - stirrupRadius * 2 - mainRadius;
        const offsetH = (innerH / 2) - stirrupRadius * 2 - mainRadius;

        const mainBars = [];
        if (mc >= 4) {
            mainBars.push({ z: -offsetW, y: -offsetH });
            mainBars.push({ z: offsetW, y: -offsetH });
            mainBars.push({ z: offsetW, y: offsetH });
            mainBars.push({ z: -offsetW, y: offsetH });

            let remaining = mc - 4;
            if (remaining > 0) {
                const ratio = w / h;
                const totalPairs = Math.floor(remaining / 2);
                let horPairs = 0; verPairs = 0;
                if (ratio >= 1) {
                    horPairs = Math.ceil((totalPairs * ratio) / (ratio + 1));
                    verPairs = totalPairs - horPairs;
                } else {
                    verPairs = Math.ceil((totalPairs * (1 / ratio)) / ((1 / ratio) + 1));
                    horPairs = totalPairs - verPairs;
                }
                for (let i = 1; i <= horPairs; i++) {
                    const z = -offsetW + (2 * offsetW * i) / (horPairs + 1);
                    mainBars.push({ z: z, y: offsetH });
                    mainBars.push({ z: z, y: -offsetH });
                }
                for (let i = 1; i <= verPairs; i++) {
                    const y = -offsetH + (2 * offsetH * i) / (verPairs + 1);
                    mainBars.push({ z: offsetW, y: y });
                    mainBars.push({ z: -offsetW, y: y });
                }
                if (remaining % 2 !== 0) mainBars.push({ z: 0, y: offsetH });
            }
        } else {
            const simpleCorners = [
                { z: -offsetW, y: -offsetH }, { z: offsetW, y: offsetH },
                { z: offsetW, y: -offsetH }, { z: -offsetW, y: offsetH }
            ];
            for (let i = 0; i < mc; i++) mainBars.push(simpleCorners[i]);
        }

        const mainTex = rebarBumpMap.clone();
        mainTex.repeat.set(1, l * 2);

        mainBars.forEach(pos => {
            const geom = new THREE.CylinderGeometry(mainRadius, mainRadius, l100, 8);
            const mesh = new THREE.Mesh(geom, mainMaterial.clone());
            mesh.material.bumpMap = mainTex;
            mesh.rotation.z = Math.PI / 2;
            mesh.position.set(0, pos.y, pos.z);
            s.group.add(mesh);
        });

        // Stirrups (Transverse bars in YZ plane)
        const stirrupTexH = rebarBumpMap.clone();
        stirrupTexH.repeat.set(1, w);
        const stirrupTexV = rebarBumpMap.clone();
        stirrupTexV.repeat.set(1, h);

        stirrupPositions.forEach(pos => {
            const xPos = (pos * 100) - (l100 / 2);
            if (xPos > l100 / 2 + 1) return;

            const stirrupGroup = new THREE.Group();
            const horGeom = new THREE.CylinderGeometry(stirrupRadius, stirrupRadius, innerW, 8);

            const tMesh = new THREE.Mesh(horGeom, stirrupMaterial.clone());
            tMesh.material.bumpMap = stirrupTexH;
            tMesh.rotation.x = Math.PI / 2;
            tMesh.position.set(0, innerH / 2 - stirrupRadius, 0);
            stirrupGroup.add(tMesh);

            const bMesh = tMesh.clone();
            bMesh.position.set(0, -innerH / 2 + stirrupRadius, 0);
            stirrupGroup.add(bMesh);

            const verGeom = new THREE.CylinderGeometry(stirrupRadius, stirrupRadius, innerH, 8);
            const lMesh = new THREE.Mesh(verGeom, stirrupMaterial.clone());
            lMesh.material.bumpMap = stirrupTexV;
            lMesh.position.set(0, 0, -innerW / 2 + stirrupRadius);
            stirrupGroup.add(lMesh);

            const rMesh = lMesh.clone();
            rMesh.position.set(0, 0, innerW / 2 - stirrupRadius);
            stirrupGroup.add(rMesh);

            stirrupGroup.position.x = xPos;
            s.group.add(stirrupGroup);
        });

        const maxDim = Math.max(l, w, h) * 100;
        if (!s.cameraInitialSet) {
            if (s.camera) s.camera.position.set(maxDim * 0.8, maxDim * 0.8, maxDim * 0.8);
            if (s.controls) { s.controls.target.set(0, 0, 0); }
            s.cameraInitialSet = true;
        }
        if (s.controls) s.controls.update();
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
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                    const key = tab.getAttribute('data-calc') || (targetId.startsWith('rebar') ? 'rebar' : (targetId.startsWith('concrete') ? 'concrete' : (targetId.startsWith('rama') ? 'rama' : 'truss')));
                    const h = key === 'truss' || key === 'rama' || key === 'karkaz' ? 450 : 350;
                    init3DScene(key, h);
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

    btnCalcKarkaz.addEventListener('click', calculateKarkaz);

    btnCalcRama.addEventListener('click', calculateRama);

    ramaCols.addEventListener('input', () => {
        const cols = parseInt(ramaCols.value) || 3;
        const count = Math.max(1, cols - 1);
        const container = document.getElementById('rama-col-dists');
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const inp = document.createElement('input');
            inp.type = 'number';
            inp.className = 'rama-dist-input glass-input';
            inp.value = '4.0';
            inp.step = '0.1';
            inp.style.padding = '5px';
            inp.style.textAlign = 'center';
            container.appendChild(inp);
        }
    });

    function calculateRama() {
        const floors = parseInt(ramaFloors.value);
        const cols = parseInt(ramaCols.value);
        const h = parseFloat(ramaColH.value);
        
        const distInputs = document.querySelectorAll('.rama-dist-input');
        const dists = Array.from(distInputs).map(inp => parseFloat(inp.value) || 4.0);
        const totalDist = dists.reduce((a, b) => a + b, 0);

        const md = parseFloat(ramaMainDiam.value);
        const sd = parseFloat(ramaStirrupDiam.value);

        if (!floors || !cols || !h || !md || !sd) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        const mainUnitW = (md * md) / 162;
        const stirrupUnitW = (sd * sd) / 162;
        const colSize = 0.4;

        // Concrete
        const colVol = floors * cols * h * colSize * colSize;
        const beamVol = floors * totalDist * colSize * colSize;
        const totalConcrete = colVol + beamVol;

        // Rebar
        const mainPerCol = h * 4 * mainUnitW;
        const mainPerBeam = totalDist * 4 * mainUnitW;
        const totalMain = (cols * floors * mainPerCol) + (floors * mainPerBeam);

        // All floors: 100mm dense zones (1/4 top, 1/4 bot), 200mm middle
        const colStirrupsPerFloor = ((h * 0.5) / 0.1) + ((h * 0.5) / 0.2);
        const stirrupPerCol = (2 * (colSize + colSize)) * colStirrupsPerFloor * stirrupUnitW;
        const totalColStirrup = cols * floors * stirrupPerCol;

        // Beams: 100mm dense zones (1/4 left, 1/4 right), 200mm middle
        let totalBeamStirrup = 0;
        dists.forEach(d => {
            const beamStirrupsPerFloor = ((d * 0.5) / 0.1) + ((d * 0.5) / 0.2);
            const stirrupPerBeam = (2 * (colSize + colSize)) * beamStirrupsPerFloor * stirrupUnitW;
            totalBeamStirrup += floors * stirrupPerBeam;
        });

        const totalStirrup = totalColStirrup + totalBeamStirrup;

        const totalWeight = totalMain + totalStirrup;

        animateValue(resRamaWeight, 0, totalWeight, 1000, 2);
        animateValue(resRamaConcrete, 0, totalConcrete, 1000, 3);
        animateValue(resRamaMain, 0, totalMain, 1000, 2);
        animateValue(resRamaStirrup, 0, totalStirrup, 1000, 2);

        ramaResultContainer.classList.remove('hidden-animated');
        ramaResultContainer.classList.add('visible-animated');

        updateRama3D(floors, cols, h, dists, md, sd);

        saveToHistory({
            type: 'Rama',
            info: `${floors} qavat, ${cols} ustun`,
            weight: totalWeight.toFixed(2),
            date: new Date().toLocaleString()
        });
    }

    if (btnCalcFundament) btnCalcFundament.addEventListener('click', calculateFundament);

    function calculateFundament() {
        const type = fundamentType ? fundamentType.value : 'isolated';
        const L = parseFloat(fundamentLength.value);
        const W = parseFloat(fundamentWidth.value);
        const H = parseFloat(fundamentThick.value);
        const D = parseFloat(fundamentDepth.value);
        
        let colSize = 0, colH = 0, wallThick = 0;
        if (type === 'isolated') {
            colSize = parseFloat(fundamentColSize.value);
            colH = parseFloat(fundamentColH.value);
        } else if (type === 'strip') {
            wallThick = parseFloat(fundamentWallThick.value);
        }
        
        const mDiam = parseFloat(fundamentMainDiam.value);
        const mStep = parseFloat(fundamentMainStep.value) / 1000; // mm to m
        const colDiam = parseFloat(fundamentColDiam.value);
        const stirrupDiam = parseFloat(fundamentStirrupDiam.value);

        if (!L || !W || !H || !D || !mDiam || !mStep) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }
        if (type === 'isolated' && (!colSize || !colH || !colDiam || !stirrupDiam)) return;
        if (type === 'strip' && (!wallThick || !colDiam || !stirrupDiam)) return;

        // Qazilma (Katlavan)
        const pitL = L + (type === 'raft' ? 1.0 : 1.0);
        const pitW = W + (type === 'raft' ? 1.0 : 1.0);
        const soilVol = pitL * pitW * D;

        // Sand & Gravel (0.1m each)
        const sandVol = pitL * pitW * 0.1;
        const gravelVol = pitL * pitW * 0.1;

        // Concrete
        const padVol = L * W * H;
        let concreteVol = padVol;
        if (type === 'isolated') {
            concreteVol += (colSize * colSize * colH);
        }

        // Rebar - Mesh
        const unitWMesh = (mDiam * mDiam) / 162;
        const numBarsL = Math.floor(W / mStep) + 1;
        const numBarsW = Math.floor(L / mStep) + 1;
        const meshWeight = (numBarsL * L + numBarsW * W) * unitWMesh * 2; // 2 layers for all

        // Secondary Rebar (Column or Wall)
        let totalColWeight = 0;
        if (type === 'isolated') {
            const unitWCol = (colDiam * colDiam) / 162;
            const unitWStirrup = (stirrupDiam * stirrupDiam) / 162;
            const colMainWeight = (colH + H + 0.3) * 4 * unitWCol;
            const stirrupLen = (colSize * 4);
            const numStirrups = Math.floor(colH / 0.15);
            totalColWeight = colMainWeight + (numStirrups * stirrupLen * unitWStirrup);
        } else if (type === 'strip') {
            const unitWCol = (colDiam * colDiam) / 162;
            const unitWStirrup = (stirrupDiam * stirrupDiam) / 162;
            // Assume 2 rows of vertical starter bars for wall, spaced every 0.2m
            const numVerticalBars = Math.floor(L / 0.2) * 2;
            const vertBarLen = H + 0.8; // 0.8m protruding + hook
            const colMainWeight = numVerticalBars * vertBarLen * unitWCol;
            
            // Connective longitudinal bars inside strip (e.g. 4 bars)
            const numLongBars = 4;
            const stirrupLen = (W * 2 + H * 2) - 0.2;
            const numStirrups = Math.floor(L / 0.2);
            const stirrupWeight = numStirrups * stirrupLen * unitWStirrup;
            
            totalColWeight = colMainWeight + stirrupWeight + (numLongBars * L * unitWCol);
        }

        animateValue(resFundamentSoil, 0, soilVol, 1000, 2);
        animateValue(resFundamentConcrete, 0, concreteVol, 1000, 2);
        animateValue(resFundamentMeshWeight, 0, meshWeight, 1000, 2);
        animateValue(resFundamentColWeight, 0, totalColWeight, 1000, 2);
        animateValue(resFundamentSand, 0, sandVol, 1000, 2);
        animateValue(resFundamentGravel, 0, gravelVol, 1000, 2);

        fundamentResultContainer.classList.remove('hidden-animated');
        fundamentResultContainer.classList.add('visible-animated');

        updateFundament3D(type, L, W, H, D, colSize, colH, pitL, pitW, wallThick);
    }

    if (btnCalcPlita) btnCalcPlita.addEventListener('click', calcPlita);

    function calcPlita() {
        const type = document.getElementById('plita-type').value;
        const L = parseFloat(plitaLength.value);
        const W = parseFloat(plitaWidth.value);
        const T = parseFloat(plitaThick.value) / 1000;

        if (isNaN(L) || isNaN(W) || isNaN(T)) return;

        let volume = L * W * T;
        let area = L * W;

        if (type === 'hollow') {
            volume *= 0.6; // ~40% voids
        } else if (type === 'ribbed') {
            volume *= 0.7; // Ribbed geometry
        }

        // Standard concrete density ~2500 kg/m3
        const weight = volume * 2500;

        plitaResultContainer.classList.remove('hidden-animated');
        plitaResultContainer.classList.add('visible-animated');

        animateValue(resPlitaWeight, 0, weight, 1000, 2);
        animateValue(resPlitaConcrete, 0, volume, 1000, 3);
        animateValue(document.getElementById('res-plita-area'), 0, area, 1000, 2);

        updatePlita3D(L, W, T, 0, 0, type);
        drawPlita2D(L, W, T, type);

        saveToHistory({
            type: `Plita (${type})`,
            info: `${L}x${W}m, qalinlik ${plitaThick.value}mm`,
            weight: weight.toFixed(2),
            date: new Date().toLocaleString()
        });
    }

    function drawPlita2D(L, W, T, type) {
        if (!ctxP) return;
        const canvas = plitaCanvas;
        const w = canvas.width = canvas.parentElement.clientWidth;
        const h = canvas.height = 300;
        ctxP.clearRect(0, 0, w, h);

        const padding = 40;
        const drawW = w - padding * 2;
        const drawH = 150;
        const scale = Math.min(drawW / (W * 100), drawH / (T * 100)) * 0.8;

        const pW = W * 100 * scale;
        const pH = T * 100 * scale;
        const startX = (w - pW) / 2;
        const startY = (h - pH) / 2 + 20;

        ctxP.strokeStyle = '#ff3333';
        ctxP.lineWidth = 3;
        ctxP.lineJoin = 'round';
        ctxP.beginPath();

        if (type === 'ribbed') {
            // Ribbed profile as per user image
            const ribW = pW * 0.15;
            const topT = pH * 0.25;

            ctxP.moveTo(startX, startY);
            ctxP.lineTo(startX + pW, startY);
            ctxP.lineTo(startX + pW, startY + pH);
            ctxP.lineTo(startX + pW - ribW * 0.7, startY + pH);
            ctxP.lineTo(startX + pW - ribW, startY + topT);
            ctxP.lineTo(startX + ribW, startY + topT);
            ctxP.lineTo(startX + ribW * 0.7, startY + pH);
            ctxP.lineTo(startX, startY + pH);
            ctxP.closePath();
            ctxP.stroke();

            // Lifting loops (semi-circles)
            ctxP.beginPath();
            ctxP.arc(startX + pW * 0.2, startY, 15, Math.PI, 0);
            ctxP.stroke();
            ctxP.beginPath();
            ctxP.arc(startX + pW * 0.8, startY, 15, Math.PI, 0);
            ctxP.stroke();

        } else if (type === 'hollow') {
            // Hollow Core profile
            ctxP.strokeRect(startX, startY, pW, pH);
            const numHoles = 5;
            const r = pH * 0.3;
            for (let i = 1; i <= numHoles; i++) {
                ctxP.beginPath();
                ctxP.arc(startX + (i * pW / (numHoles + 1)), startY + pH / 2, r, 0, Math.PI * 2);
                ctxP.stroke();
            }
        } else {
            // Monolith profile
            ctxP.strokeRect(startX, startY, pW, pH);
            // Show rebar dots
            ctxP.fillStyle = '#ff3333';
            for (let i = 0; i < 6; i++) {
                ctxP.beginPath();
                ctxP.arc(startX + 10 + i * (pW - 20) / 5, startY + 10, 4, 0, Math.PI * 2);
                ctxP.arc(startX + 10 + i * (pW - 20) / 5, startY + pH - 10, 4, 0, Math.PI * 2);
                ctxP.fill();
            }
        }

        // Labels
        ctxP.fillStyle = currentTheme === 'dark' ? '#aaa' : '#555';
        ctxP.font = '14px Outfit';
        ctxP.textAlign = 'center';
        ctxP.fillText(`${W} m (Eni)`, w / 2, startY - 25);

        ctxP.save();
        ctxP.translate(startX - 20, startY + pH / 2);
        ctxP.rotate(-Math.PI / 2);
        ctxP.fillText(`${T * 1000} mm`, 0, 0);
        ctxP.restore();

        ctxP.fillText(type.toUpperCase() + " PLITA KESIMI", w / 2, h - 20);
    }

    function createTextLabel(text, color) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;
        ctx.font = 'Bold 55px Outfit';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText(text, 256, 64);
        ctx.fillText(text, 256, 64);

        const tex = new THREE.CanvasTexture(canvas);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(80, 20, 1);
        return sprite;
    }

    function updatePlita3D(L, W, T, S, D, type) {
        init3DScene('plita', 450);
        const s = scenes.plita;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const lU = L * 100;
        const wU = W * 100;
        const tU = T * 100;

        // Real Opaque Concrete Material
        const realConcreteMat = new THREE.MeshPhongMaterial({
            color: 0x555555,
            opacity: 1.0,
            transparent: false,
            shininess: 5,
            flatShading: false
        });

        if (type === 'hollow') {
            // --- HOLLOW CORE ---
            const shape = new THREE.Shape();
            shape.moveTo(-wU / 2, -tU / 2); shape.lineTo(wU / 2, -tU / 2);
            shape.lineTo(wU / 2, tU / 2); shape.lineTo(-wU / 2, tU / 2);
            shape.lineTo(-wU / 2, -tU / 2);
            const holeRadius = (tU * 0.7) / 2;
            const numHoles = Math.floor(wU / (holeRadius * 3));
            const spacing = wU / (numHoles + 1);
            for (let i = 1; i <= numHoles; i++) {
                const holePath = new THREE.Path();
                holePath.absarc(-wU / 2 + (i * spacing), 0, holeRadius, 0, Math.PI * 2, true);
                shape.holes.push(holePath);
            }
            const slab = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: lU, bevelEnabled: false }), realConcreteMat);
            slab.rotation.y = Math.PI / 2; slab.position.x = -lU / 2;
            s.group.add(slab);
            s.group.add(createTextLabel("PUSTOTNAYA PLITA", "#333")).position.y = tU / 2 + 30;

        } else if (type === 'ribbed') {
            // --- RIBBED SLAB ---
            const ribW = 15;
            const ribH = tU * 0.8;
            const topThick = tU * 0.2;

            const top = new THREE.Mesh(new THREE.BoxGeometry(lU, topThick, wU), realConcreteMat);
            top.position.y = tU / 2 - topThick / 2;
            s.group.add(top);

            [-1, 1].forEach(dir => {
                const rib = new THREE.Mesh(new THREE.BoxGeometry(lU, ribH, ribW), realConcreteMat);
                rib.position.set(0, -ribH / 2 + tU / 2 - topThick, dir * (wU / 2 - ribW / 2));
                s.group.add(rib);
            });
            s.group.add(createTextLabel("REBRISTAYA PLITA", "#333")).position.y = tU / 2 + 30;

        } else {
            // --- MONOLITH ---
            const slab = new THREE.Mesh(new THREE.BoxGeometry(lU, tU, wU), realConcreteMat);
            s.group.add(slab);
            s.group.add(createTextLabel("MONOLIT PLITA", "#333")).position.y = tU / 2 + 30;
        }

        // Enhanced Lighting for Realism
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(100, 200, 100);
        s.scene.add(dirLight);
        s.scene.add(new THREE.AmbientLight(0xffffff, 0.3));

        const maxDim = Math.max(lU, wU);
        if (!s.cameraInitialSet) {
            s.camera.position.set(maxDim, tU * 5, maxDim);
            s.controls.target.set(0, 0, 0);
            s.cameraInitialSet = true;
        }
        s.controls.update();
    }

    function updateFundament3D(type, L, W, H, D, colSize, colH, pitL, pitW, wallThick) {
        init3DScene('fundament', 500);
        const s = scenes.fundament;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const scale = 100; // 1m = 100 units
        const lU = L * scale;
        const wU = W * scale;
        const hU = H * scale;
        const dU = D * scale;
        const cU = colSize * scale;
        const chU = colH * scale;
        const plU = pitL * scale;
        const pwU = pitW * scale;
        const wtU = wallThick * scale;

        // Materials
        const soilMat = new THREE.MeshPhongMaterial({ color: 0x5c4033 }); // Brown dirt
        const sandMat = new THREE.MeshPhongMaterial({ color: 0xc2b280 }); // Sand
        const gravelMat = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Gravel
        const concreteMat = new THREE.MeshPhongMaterial({ color: 0x999999, transparent: true, opacity: 0.3 }); // Transparent concrete
        const rebarMat = getRebarMaterial(0xaa0000); // Main rebar
        const stirrupMat = getRebarMaterial(0x555555); // Stirrup
        
        const baseGroup = new THREE.Group();

        // 1. Excavation Pit (Katlavan)
        const wallHThick = 50;
        
        // Bottom soil
        const soilBottom = new THREE.Mesh(new THREE.BoxGeometry(plU + wallHThick*2, wallHThick, pwU + wallHThick*2), soilMat);
        soilBottom.position.y = -dU - wallHThick/2;
        baseGroup.add(soilBottom);

        // Walls
        const wallH = dU;
        const wallL1 = new THREE.Mesh(new THREE.BoxGeometry(wallHThick, wallH, pwU + wallHThick*2), soilMat);
        wallL1.position.set(-plU/2 - wallHThick/2, -dU/2, 0);
        baseGroup.add(wallL1);

        const wallL2 = new THREE.Mesh(new THREE.BoxGeometry(wallHThick, wallH, pwU + wallHThick*2), soilMat);
        wallL2.position.set(plU/2 + wallHThick/2, -dU/2, 0);
        baseGroup.add(wallL2);

        const wallW1 = new THREE.Mesh(new THREE.BoxGeometry(plU, wallH, wallHThick), soilMat);
        wallW1.position.set(0, -dU/2, -pwU/2 - wallHThick/2);
        baseGroup.add(wallW1);

        const wallW2 = new THREE.Mesh(new THREE.BoxGeometry(plU, wallH, wallHThick), soilMat);
        wallW2.position.set(0, -dU/2, pwU/2 + wallHThick/2);
        baseGroup.add(wallW2);

        // 2. Layers (Sand, Gravel)
        const sandH = 10;
        const gravelH = 10;
        
        const sand = new THREE.Mesh(new THREE.BoxGeometry(plU, sandH, pwU), sandMat);
        sand.position.y = -dU + sandH/2;
        baseGroup.add(sand);

        const gravel = new THREE.Mesh(new THREE.BoxGeometry(plU, gravelH, pwU), gravelMat);
        gravel.position.y = -dU + sandH + gravelH/2;
        baseGroup.add(gravel);

        // 3. Concrete Pad
        const padBaseY = -dU + sandH + gravelH;
        const pad = new THREE.Mesh(new THREE.BoxGeometry(lU, hU, wU), concreteMat);
        pad.position.y = padBaseY + hU/2;
        baseGroup.add(pad);

        // 5. Pad Rebar Mesh
        const meshStep = 20;
        const cover = 5;
        const mR = 0.7; // rebar radius
        
        const drawGrid = (yPos) => {
            const grid = new THREE.Group();
            for(let x = -lU/2 + cover; x <= lU/2 - cover; x += meshStep) {
                const b = new THREE.Mesh(new THREE.CylinderGeometry(mR, mR, wU - cover*2, 8), rebarMat);
                b.rotation.x = Math.PI/2;
                b.position.set(x, 0, 0);
                grid.add(b);
            }
            for(let z = -wU/2 + cover; z <= wU/2 - cover; z += meshStep) {
                const b = new THREE.Mesh(new THREE.CylinderGeometry(mR, mR, lU - cover*2, 8), rebarMat);
                b.rotation.z = Math.PI/2;
                b.position.set(0, mR*2, z);
                grid.add(b);
            }
            grid.position.y = yPos;
            return grid;
        };

        baseGroup.add(drawGrid(padBaseY + cover)); // Bottom mesh
        baseGroup.add(drawGrid(padBaseY + hU - cover - mR*2)); // Top mesh

        // Secondary Rebar (Column or Wall)
        const cR = 0.8;
        const stirrupR = 0.4;

        if (type === 'isolated') {
            // 4. Concrete Column
            const col = new THREE.Mesh(new THREE.BoxGeometry(cU, chU, cU), concreteMat);
            col.position.y = padBaseY + hU + chU/2;
            baseGroup.add(col);

            const off = cU/2 - cover;
            // 4 main bars
            const cPos = [{x:-off,z:-off}, {x:off,z:-off}, {x:off,z:off}, {x:-off,z:off}];
            cPos.forEach(p => {
                const bLen = chU + hU - cover*2;
                const b = new THREE.Mesh(new THREE.CylinderGeometry(cR, cR, bLen, 8), rebarMat);
                b.position.set(p.x, padBaseY + cover + bLen/2, p.z);
                baseGroup.add(b);
                
                // Anchor hook
                const hLen = 20;
                const hook = new THREE.Mesh(new THREE.CylinderGeometry(cR, cR, hLen, 8), rebarMat);
                hook.rotation.z = Math.PI/2;
                hook.position.set(p.x + (p.x>0?-hLen/2:hLen/2), padBaseY + cover, p.z);
                baseGroup.add(hook);
            });

            // Stirrups
            const stirrupStep = 15;
            const sSize = cU - cover*2;
            const sGeom = new THREE.CylinderGeometry(stirrupR, stirrupR, sSize, 8);
            for(let y = padBaseY + cover + 10; y <= padBaseY + hU + chU - cover; y += stirrupStep) {
                const ring = new THREE.Group();
                for(let j=0; j<4; j++) {
                    const s = new THREE.Mesh(sGeom, stirrupMat);
                    if(j===0){s.rotation.z=Math.PI/2; s.position.set(0,0,sSize/2);}
                    if(j===1){s.rotation.z=Math.PI/2; s.position.set(0,0,-sSize/2);}
                    if(j===2){s.rotation.x=Math.PI/2; s.position.set(sSize/2,0,0);}
                    if(j===3){s.rotation.x=Math.PI/2; s.position.set(-sSize/2,0,0);}
                    ring.add(s);
                }
                ring.position.y = y;
                baseGroup.add(ring);
            }
        } else if (type === 'strip') {
            // 4. Concrete Wall stub
            const wStubH = 50; 
            const wall = new THREE.Mesh(new THREE.BoxGeometry(lU, wStubH, wtU), concreteMat);
            wall.position.y = padBaseY + hU + wStubH/2;
            baseGroup.add(wall);

            // Wall Starter bars (2 rows along length)
            const bLen = wStubH + hU - cover*2;
            for(let x = -lU/2 + cover + 10; x <= lU/2 - cover; x += 20) {
                // Front row
                const b1 = new THREE.Mesh(new THREE.CylinderGeometry(cR, cR, bLen, 8), rebarMat);
                b1.position.set(x, padBaseY + cover + bLen/2, wtU/2 - cover);
                baseGroup.add(b1);
                // Back row
                const b2 = new THREE.Mesh(new THREE.CylinderGeometry(cR, cR, bLen, 8), rebarMat);
                b2.position.set(x, padBaseY + cover + bLen/2, -wtU/2 + cover);
                baseGroup.add(b2);
            }
            
            // Connective longitudinal bars inside wall stub
            for(let z of [wtU/2 - cover, -wtU/2 + cover]) {
                for (let y of [padBaseY + hU + 10, padBaseY + hU + wStubH - 10]) {
                    const b = new THREE.Mesh(new THREE.CylinderGeometry(stirrupR, stirrupR, lU - cover*2, 8), stirrupMat);
                    b.rotation.z = Math.PI/2;
                    b.position.set(0, y, z);
                    baseGroup.add(b);
                }
            }
        }

        s.group.add(baseGroup);

        // Add lights
        const dl = new THREE.DirectionalLight(0xffffff, 0.8);
        dl.position.set(500, 1000, 500);
        s.scene.add(dl);
        s.scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        if (!s.cameraInitialSet) {
            s.camera.position.set(plU * 1.5, plU, plU * 1.5);
            s.controls.target.set(0, -dU/2, 0);
            s.cameraInitialSet = true;
        }
        s.controls.update();
    }

    function updateRama3D(floors, cols, h, dists, md, sd) {
        init3DScene('rama', 450);
        const s = scenes.rama;
        if (!s || !s.group) return;
        while (s.group.children.length > 0) s.group.remove(s.group.children[0]);

        const colSize = 40;
        const hUnits = h * 100;
        const lapLen = (md * 40) / 10;

        const concreteMat = new THREE.MeshPhongMaterial({ color: 0x888888, transparent: true, opacity: 0.25 });
        const mainMat = getRebarMaterial(0x555555);
        const stirrupMat = getRebarMaterial(0xaa0000);
        const connectionMat = new THREE.MeshPhongMaterial({ color: 0xff3300, shininess: 100 });

        const drawMember = (x, y, z, length, type, isLastFloor = false) => {
            const group = new THREE.Group();

            // Concrete
            const geom = type === 'col' ? new THREE.BoxGeometry(colSize, length, colSize) : new THREE.BoxGeometry(length, colSize, colSize);
            const mesh = new THREE.Mesh(geom, concreteMat);
            group.add(mesh);

            // Main Rebar
            const r = md / 20;
            const off = colSize / 2 - 5;
            const rebarLen = type === 'col' ? (isLastFloor ? length : length + lapLen) : length;
            const rebarGeom = new THREE.CylinderGeometry(r, r, rebarLen, 8);

            const positions = type === 'col'
                ? [{ x: -off, z: -off }, { x: off, z: -off }, { x: off, z: off }, { x: -off, z: off }]
                : [{ y: -off, z: -off }, { y: off, z: -off }, { y: off, z: off }, { y: -off, z: off }];

            positions.forEach(p => {
                const rb = new THREE.Mesh(rebarGeom, mainMat);
                if (type === 'beam') rb.rotation.z = Math.PI / 2;
                const yOff = type === 'col' ? (isLastFloor ? 0 : lapLen / 2) : 0;
                rb.position.set(p.x || 0, (p.y || 0) + yOff, p.z || 0);
                group.add(rb);

                if (type === 'col' && !isLastFloor) {
                    const splice = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.2, r + 0.2, lapLen, 8), connectionMat);
                    splice.position.set(p.x, length / 2 + lapLen / 2, p.z);
                    group.add(splice);
                }

                if (type === 'beam') {
                    const hookLen = 30;
                    const hookGeom = new THREE.CylinderGeometry(r, r, hookLen, 8);
                    const isTop = p.y > 0;

                    const hL = new THREE.Mesh(hookGeom, connectionMat);
                    hL.position.set(-length / 2 - 10, isTop ? -hookLen / 2 + off : hookLen / 2 - off, p.z);
                    group.add(hL);

                    const hR = new THREE.Mesh(hookGeom, connectionMat);
                    hR.position.set(length / 2 + 10, isTop ? -hookLen / 2 + off : hookLen / 2 - off, p.z);
                    group.add(hR);

                    const extGeom = new THREE.CylinderGeometry(r, r, 20, 8);
                    const extL = new THREE.Mesh(extGeom, connectionMat);
                    extL.rotation.z = Math.PI / 2;
                    extL.position.set(-length / 2 - 5, p.y, p.z);
                    group.add(extL);

                    const extR = new THREE.Mesh(extGeom, connectionMat);
                    extR.rotation.z = Math.PI / 2;
                    extR.position.set(length / 2 + 5, p.y, p.z);
                    group.add(extR);
                }
            });

            // Stirrups (High Quality Rings)
            const sR = sd / 20;
            const sStepNormal = 20;
            const sStepDense = 10;
            const denseZone = length * 0.25;

            const addRing = (iPos, isCol) => {
                const sSide = colSize - 6;
                const rGeom = new THREE.CylinderGeometry(sR, sR, sSide, 8);
                const ring = new THREE.Group();
                for (let j = 0; j < 4; j++) {
                    const side = new THREE.Mesh(rGeom, stirrupMat);
                    if (isCol) {
                        if (j === 0) { side.rotation.z = Math.PI / 2; side.position.set(0, 0, sSide / 2); }
                        if (j === 1) { side.rotation.z = Math.PI / 2; side.position.set(0, 0, -sSide / 2); }
                        if (j === 2) { side.rotation.x = Math.PI / 2; side.position.set(sSide / 2, 0, 0); }
                        if (j === 3) { side.rotation.x = Math.PI / 2; side.position.set(-sSide / 2, 0, 0); }
                    } else {
                        if (j === 0) { side.position.set(0, 0, sSide / 2); }
                        if (j === 1) { side.position.set(0, 0, -sSide / 2); }
                        if (j === 2) { side.rotation.x = Math.PI / 2; side.position.set(0, sSide / 2, 0); }
                        if (j === 3) { side.rotation.x = Math.PI / 2; side.position.set(0, -sSide / 2, 0); }
                    }
                    ring.add(side);
                }
                ring.position.set(isCol ? 0 : iPos, isCol ? iPos : 0, 0);
                group.add(ring);
            };

            for (let i = -length / 2 + 2; i <= length / 2 - 2;) {
                const isNearEnd = Math.abs(i) > (length / 2 - denseZone);
                const step = isNearEnd ? sStepDense : sStepNormal;
                addRing(i, type === 'col');
                i += step;
            }

            if (type === 'col' && !isLastFloor) {
                for (let j = 1; j <= 3; j++) addRing(length / 2 + j * 10, true);
            }

            group.position.set(x, y, z);
            s.group.add(group);
        };

        for (let f = 0; f < floors; f++) {
            const yBase = f * hUnits + hUnits / 2;
            const isLastFloor = (f === floors - 1);
            const floorIndex = f;

            let currentX = 0;
            const totalWidth = dists.reduce((a, b) => a + b, 0) * 100;
            const startX = -totalWidth / 2;

            for (let c = 0; c < cols; c++) {
                const xPos = startX + currentX;

                // --- DRAW COLUMN ---
                const colGroup = new THREE.Group();
                const colGeom = new THREE.BoxGeometry(colSize, hUnits, colSize);
                colGroup.add(new THREE.Mesh(colGeom, concreteMat));

                const r = md / 20;
                const off = 17.5; // 35cm / 2
                const pos = [{ x: -off, z: -off }, { x: off, z: -off }, { x: off, z: off }, { x: -off, z: off }];

                pos.forEach(p => {
                    const barLen = isLastFloor ? hUnits : hUnits + lapLen;
                    const barGeom = new THREE.CylinderGeometry(r, r, barLen, 8);

                    if (floorIndex > 0) {
                        // Seismic Crank (Offset for overlap)
                        const crankH = 20;
                        const crankOff = r * 1.8;

                        const bottomPart = new THREE.Mesh(new THREE.CylinderGeometry(r, r, crankH, 8), mainMat);
                        bottomPart.position.set(p.x + (p.x > 0 ? -crankOff : crankOff), -hUnits / 2 + crankH / 2, p.z + (p.z > 0 ? -crankOff : crankOff));
                        colGroup.add(bottomPart);

                        const middlePart = new THREE.Mesh(barGeom, mainMat);
                        middlePart.scale.set(1, (hUnits - crankH) / barLen, 1);
                        middlePart.position.set(p.x, crankH / 2 + (isLastFloor ? 0 : lapLen / 2), p.z);
                        colGroup.add(middlePart);
                    } else {
                        const rb = new THREE.Mesh(barGeom, mainMat);
                        rb.position.set(p.x, (isLastFloor ? 0 : lapLen / 2), p.z);
                        colGroup.add(rb);
                    }

                    if (!isLastFloor) {
                        const splice = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.3, r + 0.3, lapLen, 8), connectionMat);
                        splice.position.set(p.x, hUnits / 2 + lapLen / 2, p.z);
                        colGroup.add(splice);
                    }
                });

                // Column Stirrups (None in joints as requested)
                const sR = sd / 20;
                const sSide = 35;
                const sStepNormal = 20;
                const sStepDense = 10;
                const L_eff = hUnits;
                const denseZone = L_eff / 4;

                for (let i = -L_eff / 2 + 2; i <= L_eff / 2 - 42;) {
                    const isNearEnd = Math.abs(i) > (L_eff / 2 - denseZone);
                    const step = isNearEnd ? sStepDense : sStepNormal;
                    const ring = createRing(sSide, sR, true);
                    ring.position.set(0, i, 0);
                    colGroup.add(ring);
                    i += step;
                }

                colGroup.position.set(xPos, yBase, 0);
                s.group.add(colGroup);

                // --- DRAW BEAM ---
                if (c < cols - 1) {
                    const dUnits = dists[c] * 100;
                    const beamGroup = new THREE.Group();
                    const beamLen = dUnits + colSize;
                    const bGeom = new THREE.BoxGeometry(beamLen, colSize, colSize);
                    beamGroup.add(new THREE.Mesh(bGeom, concreteMat));

                    const hOff = beamLen / 2 - 5; // Position inside the very edge of the frame

                    pos.forEach(p => {
                        const rb = new THREE.Mesh(new THREE.CylinderGeometry(r, r, beamLen - 10, 8), mainMat);
                        rb.rotation.z = Math.PI / 2;
                        rb.position.set(0, p.x, p.z);
                        beamGroup.add(rb);

                        // Hooks (L-shaped) - Moving to the outer edges of the columns
                        const hookLen = 30;
                        const isTop = p.x > 0;

                        const hL = new THREE.Mesh(new THREE.CylinderGeometry(r, r, hookLen, 8), connectionMat);
                        hL.position.set(-hOff, isTop ? -hookLen / 2 + 17.5 : hookLen / 2 - 17.5, p.z);
                        beamGroup.add(hL);

                        const hR = new THREE.Mesh(new THREE.CylinderGeometry(r, r, hookLen, 8), connectionMat);
                        hR.position.set(hOff, isTop ? -hookLen / 2 + 17.5 : hookLen / 2 - 17.5, p.z);
                        beamGroup.add(hR);

                        // Anchors extensions
                        const extL = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 15, 8), connectionMat);
                        extL.rotation.z = Math.PI / 2;
                        extL.position.set(-hOff + 7.5, p.x, p.z);
                        beamGroup.add(extL);

                        const extR = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 15, 8), connectionMat);
                        extR.rotation.z = Math.PI / 2;
                        extR.position.set(hOff - 7.5, p.x, p.z);
                        beamGroup.add(extR);
                    });

                    // --- BEAM STIRRUPS ---
                    const bDenseZone = beamLen / 4;
                    for (let i = -beamLen / 2 + 40; i <= beamLen / 2 - 40;) {
                        const isNearEnd = Math.abs(i) > (beamLen / 2 - bDenseZone);
                        const step = isNearEnd ? sStepDense : sStepNormal;
                        const ring = createRing(35, sR, false);
                        ring.position.set(i, 0, 0);
                        beamGroup.add(ring);
                        i += step;
                    }

                    beamGroup.position.set(xPos + dUnits / 2, yBase + hUnits / 2 - colSize / 2, 0);
                    s.group.add(beamGroup);
                    
                    currentX += dUnits;
                }
            }
        }

        function createRing(side, r, isCol) {
            const ring = new THREE.Group();
            const geom = new THREE.CylinderGeometry(r, r, side, 8);
            for (let j = 0; j < 4; j++) {
                const s = new THREE.Mesh(geom, stirrupMat);
                if (isCol) {
                    if (j === 0) { s.rotation.z = Math.PI / 2; s.position.set(0, 0, side / 2); }
                    if (j === 1) { s.rotation.z = Math.PI / 2; s.position.set(0, 0, -side / 2); }
                    if (j === 2) { s.rotation.x = Math.PI / 2; s.position.set(side / 2, 0, 0); }
                    if (j === 3) { s.rotation.x = Math.PI / 2; s.position.set(-side / 2, 0, 0); }
                } else {
                    if (j === 0) { s.position.set(0, 0, side / 2); }
                    if (j === 1) { s.position.set(0, 0, -side / 2); }
                    if (j === 2) { s.rotation.x = Math.PI / 2; s.position.set(0, side / 2, 0); }
                    if (j === 3) { s.rotation.x = Math.PI / 2; s.position.set(0, -side / 2, 0); }
                }
                ring.add(s);
            }
            return ring;
        }

        const maxDim = Math.max(cols * distUnits, floors * hUnits);
        // Update target every time to center on the structure
        const targetY = (floors * hUnits) / 2;
        s.controls.target.set(0, targetY, 0);

        if (!s.cameraInitialSet) {
            s.camera.position.set(maxDim * 1.2, targetY, maxDim * 1.5);
            s.cameraInitialSet = true;
        }
        s.controls.update();
    }

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

    // Fullscreen 3D Logic
    const fullscreenOverlay = document.getElementById('fullscreen-overlay');
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const btnCloseFullscreen = document.getElementById('btn-close-fullscreen');
    let currentFullscreenKey = null;

    function enterFullscreen(key) {
        const s = scenes[key];
        if (!s || !s.renderer) return;

        currentFullscreenKey = key;
        fullscreenOverlay.classList.remove('hidden');

        // Move renderer to fullscreen container
        fullscreenContainer.appendChild(s.renderer.domElement);

        // Handle Resize
        const w = window.innerWidth;
        const h = window.innerHeight - 60; // Subtract header height
        s.renderer.setSize(w, h);
        s.camera.aspect = w / h;
        s.camera.updateProjectionMatrix();

        // Update title
        const titles = {
            rebar: "Armatura 3D",
            mesh: "Setka 3D",
            concrete: "Beton 3D",
            truss: "Ferma 3D",
            karkaz: "Karkaz 3D",
            rama: "Rama 3D"
        };
        document.getElementById('fullscreen-title').innerText = titles[key] || "3D Ko'rinish";
    }

    function exitFullscreen() {
        if (!currentFullscreenKey) return;
        const s = scenes[currentFullscreenKey];
        if (!s || !s.renderer || !s.container) return;

        fullscreenOverlay.classList.add('hidden');

        // Move renderer back to its original container
        s.container.appendChild(s.renderer.domElement);

        // Handle Resize back to normal
        const w = s.container.clientWidth;
        const h = currentFullscreenKey === 'truss' || currentFullscreenKey === 'karkaz' ? 400 : 350;
        s.renderer.setSize(w, h);
        s.camera.aspect = w / h;
        s.camera.updateProjectionMatrix();

        currentFullscreenKey = null;
    }

    document.querySelectorAll('.expand-3d-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const key = btn.getAttribute('data-calc');
            enterFullscreen(key);
        });
    });

    btnCloseFullscreen.addEventListener('click', exitFullscreen);

    // Handle Resize
    window.addEventListener('resize', () => {
        if (currentFullscreenKey) {
            const s = scenes[currentFullscreenKey];
            const w = window.innerWidth;
            const h = window.innerHeight - 60;
            s.renderer.setSize(w, h);
            s.camera.aspect = w / h;
            s.camera.updateProjectionMatrix();
        }

        Object.keys(scenes).forEach(key => {
            const s = scenes[key];
            if (s.scene && s.container && s.renderer && key !== currentFullscreenKey) {
                // Only resize if visible
                const parent = s.container.closest('.drawing-card');
                if (parent && !parent.classList.contains('hidden')) {
                    const w = s.container.clientWidth;
                    const h = (key === 'truss' || key === 'rama' || key === 'karkaz' ? 450 : 350);
                    if (w > 0 && h > 0) {
                        s.renderer.setSize(w, h);
                        s.camera.aspect = w / h;
                        s.camera.updateProjectionMatrix();
                    }
                }
            }
        });
    });
});
