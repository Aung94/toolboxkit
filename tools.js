// ===== TOOL DEFINITIONS =====
// Each tool has a render() function that returns HTML and an init() function for interactivity

const TOOLS = {

    // ==================== TEXT TOOLS ====================

    'word-counter': {
        title: 'Word Counter',
        render: () => `
            <div class="tool-area">
                <label>Paste or type your text:</label>
                <textarea id="wc-input" rows="8" placeholder="Start typing or paste text here..."></textarea>
                <div class="stats">
                    <div class="stat"><span class="num" id="wc-words">0</span><span class="label">Words</span></div>
                    <div class="stat"><span class="num" id="wc-chars">0</span><span class="label">Characters</span></div>
                    <div class="stat"><span class="num" id="wc-chars-ns">0</span><span class="label">No Spaces</span></div>
                    <div class="stat"><span class="num" id="wc-sentences">0</span><span class="label">Sentences</span></div>
                    <div class="stat"><span class="num" id="wc-paragraphs">0</span><span class="label">Paragraphs</span></div>
                    <div class="stat"><span class="num" id="wc-reading">0</span><span class="label">Min Read</span></div>
                </div>
            </div>`,
        init: () => {
            const input = document.getElementById('wc-input');
            const update = () => {
                const text = input.value;
                const words = text.trim() ? text.trim().split(/\s+/).length : 0;
                document.getElementById('wc-words').textContent = words;
                document.getElementById('wc-chars').textContent = text.length;
                document.getElementById('wc-chars-ns').textContent = text.replace(/\s/g, '').length;
                document.getElementById('wc-sentences').textContent = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
                document.getElementById('wc-paragraphs').textContent = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
                document.getElementById('wc-reading').textContent = Math.ceil(words / 200);
            };
            input.addEventListener('input', update);
        }
    },

    'case-converter': {
        title: 'Case Converter',
        render: () => `
            <div class="tool-area">
                <label>Enter your text:</label>
                <textarea id="cc-input" rows="5" placeholder="Enter text to convert..."></textarea>
                <div class="btn-group">
                    <button class="btn" onclick="caseConvert('upper')">UPPERCASE</button>
                    <button class="btn" onclick="caseConvert('lower')">lowercase</button>
                    <button class="btn" onclick="caseConvert('title')">Title Case</button>
                    <button class="btn" onclick="caseConvert('sentence')">Sentence case</button>
                    <button class="btn" onclick="caseConvert('camel')">camelCase</button>
                    <button class="btn" onclick="caseConvert('snake')">snake_case</button>
                    <button class="btn" onclick="caseConvert('kebab')">kebab-case</button>
                    <button class="btn" onclick="caseConvert('toggle')">tOGGLE</button>
                </div>
                <label>Result: <button class="copy-btn" onclick="copyText('cc-output')">Copy</button></label>
                <div class="output-box" id="cc-output"></div>
            </div>`,
        init: () => {
            window.caseConvert = (type) => {
                const text = document.getElementById('cc-input').value;
                const words = text.trim().split(/\s+/);
                let result;
                switch(type) {
                    case 'upper': result = text.toUpperCase(); break;
                    case 'lower': result = text.toLowerCase(); break;
                    case 'title': result = text.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()); break;
                    case 'sentence': result = text.toLowerCase().replace(/(^\s*|[.!?]\s+)(\w)/g, (m, p1, p2) => p1 + p2.toUpperCase()); break;
                    case 'camel': result = words.map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''); break;
                    case 'snake': result = words.join('_').toLowerCase(); break;
                    case 'kebab': result = words.join('-').toLowerCase(); break;
                    case 'toggle': result = [...text].map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
                }
                document.getElementById('cc-output').textContent = result;
            };
        }
    },

    'lorem-ipsum': {
        title: 'Lorem Ipsum Generator',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div>
                        <label>Number of paragraphs:</label>
                        <input type="text" id="li-count" value="3">
                    </div>
                    <div>
                        <button class="btn" onclick="generateLorem()" style="margin-top:1.5rem">Generate</button>
                        <button class="copy-btn" onclick="copyText('li-output')" style="margin-top:1.5rem">Copy</button>
                    </div>
                </div>
                <div class="output-box" id="li-output" style="min-height:200px"></div>
            </div>`,
        init: () => {
            const sentences = [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
                "Nulla facilisi morbi tempus iaculis urna id volutpat lacus.",
                "Amet volutpat consequat mauris nunc congue nisi vitae suscipit.",
                "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
                "Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt.",
                "Vitae turpis massa sed elementum tempus egestas sed sed.",
                "Platea dictumst quisque sagittis purus sit amet volutpat consequat.",
                "Turpis egestas integer eget aliquet nibh praesent tristique magna.",
                "Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit.",
                "Cursus euismod quis viverra nibh cras pulvinar mattis nunc.",
                "Eget nulla facilisi etiam dignissim diam quis enim lobortis.",
                "Viverra accumsan in nisl nisi scelerisque eu ultrices vitae.",
                "Adipiscing commodo elit at imperdiet dui accumsan sit amet.",
                "Integer feugiat scelerisque varius morbi enim nunc faucibus.",
                "Morbi tincidunt augue interdum velit euismod in pellentesque massa.",
                "Facilisis magna etiam tempor orci eu lobortis elementum nibh."
            ];
            window.generateLorem = () => {
                const count = parseInt(document.getElementById('li-count').value) || 3;
                let result = [];
                for (let p = 0; p < count; p++) {
                    const numSentences = 4 + Math.floor(Math.random() * 4);
                    let para = [];
                    for (let s = 0; s < numSentences; s++) {
                        para.push(sentences[Math.floor(Math.random() * sentences.length)]);
                    }
                    result.push(para.join(' '));
                }
                document.getElementById('li-output').textContent = result.join('\n\n');
            };
            window.generateLorem();
        }
    },

    'text-diff': {
        title: 'Text Diff Checker',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div>
                        <label>Original Text:</label>
                        <textarea id="diff-a" rows="8" placeholder="Paste original text..."></textarea>
                    </div>
                    <div>
                        <label>Modified Text:</label>
                        <textarea id="diff-b" rows="8" placeholder="Paste modified text..."></textarea>
                    </div>
                </div>
                <button class="btn" onclick="computeDiff()">Compare</button>
                <label style="margin-top:1rem">Differences:</label>
                <div class="output-box" id="diff-output" style="min-height:100px"></div>
            </div>`,
        init: () => {
            window.computeDiff = () => {
                const a = document.getElementById('diff-a').value.split('\n');
                const b = document.getElementById('diff-b').value.split('\n');
                const maxLen = Math.max(a.length, b.length);
                let html = '';
                for (let i = 0; i < maxLen; i++) {
                    if (i >= a.length) {
                        html += `<div class="diff-add">+ ${escHtml(b[i])}</div>`;
                    } else if (i >= b.length) {
                        html += `<div class="diff-del">- ${escHtml(a[i])}</div>`;
                    } else if (a[i] !== b[i]) {
                        html += `<div class="diff-del">- ${escHtml(a[i])}</div>`;
                        html += `<div class="diff-add">+ ${escHtml(b[i])}</div>`;
                    } else {
                        html += `<div>  ${escHtml(a[i])}</div>`;
                    }
                }
                document.getElementById('diff-output').innerHTML = html || '<span style="color:var(--success)">No differences found!</span>';
            };
        }
    },

    'string-replace': {
        title: 'Find & Replace',
        render: () => `
            <div class="tool-area">
                <label>Text:</label>
                <textarea id="sr-input" rows="6" placeholder="Paste text here..."></textarea>
                <div class="row">
                    <div><label>Find:</label><input type="text" id="sr-find" placeholder="Search pattern..."></div>
                    <div><label>Replace with:</label><input type="text" id="sr-replace" placeholder="Replacement..."></div>
                </div>
                <div class="checkbox-group">
                    <label><input type="checkbox" id="sr-regex"> Use Regex</label>
                    <label><input type="checkbox" id="sr-case"> Case Sensitive</label>
                    <label><input type="checkbox" id="sr-global" checked> Replace All</label>
                </div>
                <button class="btn" onclick="doReplace()">Replace</button>
                <label style="margin-top:1rem">Result: <button class="copy-btn" onclick="copyText('sr-output')">Copy</button></label>
                <div class="output-box" id="sr-output"></div>
            </div>`,
        init: () => {
            window.doReplace = () => {
                const text = document.getElementById('sr-input').value;
                const find = document.getElementById('sr-find').value;
                const replace = document.getElementById('sr-replace').value;
                const useRegex = document.getElementById('sr-regex').checked;
                const caseSensitive = document.getElementById('sr-case').checked;
                const global = document.getElementById('sr-global').checked;
                let flags = (global ? 'g' : '') + (caseSensitive ? '' : 'i');
                try {
                    const pattern = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
                    document.getElementById('sr-output').textContent = text.replace(pattern, replace);
                } catch(e) {
                    document.getElementById('sr-output').textContent = 'Error: ' + e.message;
                }
            };
        }
    },

    'text-sort': {
        title: 'Sort Lines',
        render: () => `
            <div class="tool-area">
                <label>Enter text (one item per line):</label>
                <textarea id="ts-input" rows="8" placeholder="One item per line..."></textarea>
                <div class="btn-group">
                    <button class="btn" onclick="sortLines('asc')">A → Z</button>
                    <button class="btn" onclick="sortLines('desc')">Z → A</button>
                    <button class="btn" onclick="sortLines('reverse')">Reverse</button>
                    <button class="btn" onclick="sortLines('shuffle')">Shuffle</button>
                    <button class="btn" onclick="sortLines('dedup')">Remove Duplicates</button>
                    <button class="btn" onclick="sortLines('trim')">Trim Empty</button>
                </div>
                <label>Result: <button class="copy-btn" onclick="copyText('ts-output')">Copy</button></label>
                <div class="output-box" id="ts-output"></div>
            </div>`,
        init: () => {
            window.sortLines = (type) => {
                let lines = document.getElementById('ts-input').value.split('\n');
                switch(type) {
                    case 'asc': lines.sort((a, b) => a.localeCompare(b)); break;
                    case 'desc': lines.sort((a, b) => b.localeCompare(a)); break;
                    case 'reverse': lines.reverse(); break;
                    case 'shuffle': lines.sort(() => Math.random() - 0.5); break;
                    case 'dedup': lines = [...new Set(lines)]; break;
                    case 'trim': lines = lines.filter(l => l.trim()); break;
                }
                document.getElementById('ts-output').textContent = lines.join('\n');
            };
        }
    },

    // ==================== DEVELOPER TOOLS ====================

    'json-formatter': {
        title: 'JSON Formatter & Validator',
        render: () => `
            <div class="tool-area">
                <label>Paste JSON:</label>
                <textarea id="jf-input" rows="10" placeholder='{"key": "value", "array": [1, 2, 3]}'></textarea>
                <div class="btn-group">
                    <button class="btn" onclick="formatJSON('pretty')">Format / Beautify</button>
                    <button class="btn" onclick="formatJSON('minify')">Minify</button>
                    <button class="btn" onclick="formatJSON('validate')">Validate</button>
                    <button class="copy-btn" onclick="copyText('jf-output')">Copy Result</button>
                </div>
                <div id="jf-status" style="margin:0.5rem 0;font-size:0.9rem"></div>
                <div class="output-box" id="jf-output" style="min-height:150px"></div>
            </div>`,
        init: () => {
            window.formatJSON = (mode) => {
                const input = document.getElementById('jf-input').value;
                const status = document.getElementById('jf-status');
                const output = document.getElementById('jf-output');
                try {
                    const parsed = JSON.parse(input);
                    status.innerHTML = '<span style="color:var(--success)">✓ Valid JSON</span>';
                    if (mode === 'pretty') output.textContent = JSON.stringify(parsed, null, 2);
                    else if (mode === 'minify') output.textContent = JSON.stringify(parsed);
                    else output.textContent = 'Valid JSON with ' + JSON.stringify(parsed, null, 2).split('\n').length + ' lines';
                } catch(e) {
                    status.innerHTML = '<span style="color:var(--danger)">✗ Invalid JSON</span>';
                    output.textContent = 'Error: ' + e.message;
                }
            };
        }
    },

    'regex-tester': {
        title: 'Regex Tester',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div style="flex:3"><label>Pattern:</label><input type="text" id="rx-pattern" placeholder="Enter regex pattern..."></div>
                    <div style="flex:1"><label>Flags:</label><input type="text" id="rx-flags" value="g" placeholder="gi"></div>
                </div>
                <label>Test String:</label>
                <textarea id="rx-input" rows="5" placeholder="Enter test string..."></textarea>
                <div id="rx-matches" style="margin-top:1rem"></div>
            </div>`,
        init: () => {
            const update = () => {
                const pattern = document.getElementById('rx-pattern').value;
                const flags = document.getElementById('rx-flags').value;
                const text = document.getElementById('rx-input').value;
                const el = document.getElementById('rx-matches');
                if (!pattern) { el.innerHTML = ''; return; }
                try {
                    const regex = new RegExp(pattern, flags);
                    const matches = [...text.matchAll(regex)];
                    if (matches.length === 0) {
                        el.innerHTML = '<span style="color:var(--warning)">No matches found</span>';
                    } else {
                        let html = `<span style="color:var(--success)">${matches.length} match(es) found:</span><br><br>`;
                        matches.forEach((m, i) => {
                            html += `<div style="margin-bottom:0.5rem"><strong>Match ${i+1}:</strong> <code>${escHtml(m[0])}</code> at index ${m.index}`;
                            if (m.length > 1) {
                                html += '<br>Groups: ';
                                for (let g = 1; g < m.length; g++) html += `<code>${escHtml(m[g] || '')}</code> `;
                            }
                            html += '</div>';
                        });
                        el.innerHTML = html;
                    }
                } catch(e) {
                    el.innerHTML = `<span style="color:var(--danger)">Error: ${escHtml(e.message)}</span>`;
                }
            };
            document.getElementById('rx-pattern').addEventListener('input', update);
            document.getElementById('rx-flags').addEventListener('input', update);
            document.getElementById('rx-input').addEventListener('input', update);
        }
    },

    'html-preview': {
        title: 'HTML Live Preview',
        render: () => `
            <div class="tool-area">
                <label>Write HTML/CSS/JS:</label>
                <textarea id="hp-input" rows="12" placeholder="<h1>Hello World</h1>">&lt;h1 style="color: #6366f1; font-family: sans-serif;"&gt;Hello World!&lt;/h1&gt;
&lt;p&gt;Edit this HTML to see live preview below.&lt;/p&gt;</textarea>
                <label style="margin-top:1rem">Preview:</label>
                <iframe id="hp-preview" style="width:100%;height:300px;border:1px solid var(--border);border-radius:8px;background:white;margin-top:0.5rem" sandbox="allow-scripts"></iframe>
            </div>`,
        init: () => {
            const input = document.getElementById('hp-input');
            const preview = document.getElementById('hp-preview');
            const update = () => {
                preview.srcdoc = input.value;
            };
            input.addEventListener('input', update);
            update();
        }
    },

    'markdown-preview': {
        title: 'Markdown Preview',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div>
                        <label>Markdown:</label>
                        <textarea id="md-input" rows="12" placeholder="# Hello World">## Markdown Preview\n\nType **bold**, *italic*, ~~strikethrough~~.\n\n- List item 1\n- List item 2\n\n\`\`\`js\nconsole.log("Hello!");\n\`\`\`\n\n> Blockquote here\n\n[Link](https://example.com)</textarea>
                    </div>
                    <div>
                        <label>Preview:</label>
                        <div id="md-output" class="output-box" style="min-height:280px;overflow-y:auto"></div>
                    </div>
                </div>
            </div>`,
        init: () => {
            const input = document.getElementById('md-input');
            const output = document.getElementById('md-output');
            const renderMd = (md) => {
                return md
                    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/~~(.+?)~~/g, '<del>$1</del>')
                    .replace(/`([^`]+)`/g, '<code style="background:#2a2e3a;padding:2px 6px;border-radius:4px">$1</code>')
                    .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid var(--primary);padding-left:1rem;color:var(--text-muted)">$1</blockquote>')
                    .replace(/^- (.+)$/gm, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--primary)">$1</a>')
                    .replace(/\n\n/g, '<br><br>')
                    .replace(/\n/g, '<br>');
            };
            const update = () => { output.innerHTML = renderMd(input.value); };
            input.addEventListener('input', update);
            update();
        }
    },

    'css-minifier': {
        title: 'CSS Minifier / Beautifier',
        render: () => `
            <div class="tool-area">
                <label>Paste CSS:</label>
                <textarea id="cm-input" rows="10" placeholder="body { color: red; }"></textarea>
                <div class="btn-group">
                    <button class="btn" onclick="cssProcess('minify')">Minify</button>
                    <button class="btn" onclick="cssProcess('beautify')">Beautify</button>
                    <button class="copy-btn" onclick="copyText('cm-output')">Copy</button>
                </div>
                <div class="output-box" id="cm-output" style="min-height:150px"></div>
            </div>`,
        init: () => {
            window.cssProcess = (mode) => {
                let css = document.getElementById('cm-input').value;
                if (mode === 'minify') {
                    css = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').replace(/;}/g, '}').trim();
                } else {
                    css = css.replace(/\s*{\s*/g, ' {\n  ').replace(/\s*}\s*/g, '\n}\n\n').replace(/\s*;\s*/g, ';\n  ').replace(/  \n}/g, '\n}');
                }
                document.getElementById('cm-output').textContent = css;
            };
        }
    },

    'sql-formatter': {
        title: 'SQL Formatter',
        render: () => `
            <div class="tool-area">
                <label>Paste SQL:</label>
                <textarea id="sf-input" rows="8" placeholder="SELECT * FROM users WHERE id = 1 ORDER BY name"></textarea>
                <div class="btn-group">
                    <button class="btn" onclick="formatSQL()">Format SQL</button>
                    <button class="copy-btn" onclick="copyText('sf-output')">Copy</button>
                </div>
                <div class="output-box" id="sf-output" style="min-height:150px"></div>
            </div>`,
        init: () => {
            window.formatSQL = () => {
                let sql = document.getElementById('sf-input').value.trim();
                const keywords = ['SELECT','FROM','WHERE','AND','OR','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN','ON','INSERT INTO','VALUES','UPDATE','SET','DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','UNION','EXCEPT','INTERSECT','AS','IN','NOT','BETWEEN','LIKE','IS NULL','IS NOT NULL','EXISTS','CASE','WHEN','THEN','ELSE','END'];
                keywords.forEach(kw => {
                    const regex = new RegExp('\\b' + kw.replace(/ /g, '\\s+') + '\\b', 'gi');
                    sql = sql.replace(regex, '\n' + kw.toUpperCase());
                });
                sql = sql.trim().replace(/^\n/, '');
                document.getElementById('sf-output').textContent = sql;
            };
        }
    },

    // ==================== CONVERTERS ====================

    'base64': {
        title: 'Base64 Encoder / Decoder',
        render: () => `
            <div class="tool-area">
                <label>Input:</label>
                <textarea id="b64-input" rows="5" placeholder="Enter text to encode or Base64 to decode..."></textarea>
                <div class="btn-group">
                    <button class="btn" onclick="b64('encode')">Encode →</button>
                    <button class="btn" onclick="b64('decode')">← Decode</button>
                    <button class="copy-btn" onclick="copyText('b64-output')">Copy</button>
                </div>
                <label>Output:</label>
                <div class="output-box" id="b64-output"></div>
            </div>`,
        init: () => {
            window.b64 = (mode) => {
                const input = document.getElementById('b64-input').value;
                try {
                    const result = mode === 'encode' ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input)));
                    document.getElementById('b64-output').textContent = result;
                } catch(e) {
                    document.getElementById('b64-output').textContent = 'Error: Invalid input - ' + e.message;
                }
            };
        }
    },

    'url-encoder': {
        title: 'URL Encoder / Decoder',
        render: () => `
            <div class="tool-area">
                <label>Input:</label>
                <textarea id="url-input" rows="4" placeholder="Enter text or URL-encoded string..."></textarea>
                <div class="btn-group">
                    <button class="btn" onclick="urlConvert('encode')">Encode →</button>
                    <button class="btn" onclick="urlConvert('decode')">← Decode</button>
                    <button class="btn" onclick="urlConvert('encodeComponent')">Encode Component</button>
                    <button class="copy-btn" onclick="copyText('url-output')">Copy</button>
                </div>
                <label>Output:</label>
                <div class="output-box" id="url-output"></div>
            </div>`,
        init: () => {
            window.urlConvert = (mode) => {
                const input = document.getElementById('url-input').value;
                try {
                    let result;
                    if (mode === 'encode') result = encodeURI(input);
                    else if (mode === 'decode') result = decodeURIComponent(input);
                    else result = encodeURIComponent(input);
                    document.getElementById('url-output').textContent = result;
                } catch(e) {
                    document.getElementById('url-output').textContent = 'Error: ' + e.message;
                }
            };
        }
    },

    'color-converter': {
        title: 'Color Converter',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div>
                        <label>Pick or enter color:</label>
                        <div style="display:flex;gap:0.5rem;align-items:center">
                            <input type="color" id="clr-picker" value="#6366f1" style="width:50px;height:40px;border:none;cursor:pointer">
                            <input type="text" id="clr-hex" value="#6366f1" placeholder="#hex" style="flex:1">
                        </div>
                    </div>
                </div>
                <div class="color-preview" id="clr-preview" style="background:#6366f1"></div>
                <div class="stats">
                    <div class="stat"><span class="num" id="clr-r" style="font-size:1.2rem">99</span><span class="label">Red</span></div>
                    <div class="stat"><span class="num" id="clr-g" style="font-size:1.2rem">102</span><span class="label">Green</span></div>
                    <div class="stat"><span class="num" id="clr-b" style="font-size:1.2rem">241</span><span class="label">Blue</span></div>
                </div>
                <div style="margin-top:1rem">
                    <div><strong>HEX:</strong> <span id="clr-hex-out">#6366f1</span> <button class="copy-btn" onclick="copyInner('clr-hex-out')">Copy</button></div>
                    <div><strong>RGB:</strong> <span id="clr-rgb-out">rgb(99, 102, 241)</span> <button class="copy-btn" onclick="copyInner('clr-rgb-out')">Copy</button></div>
                    <div><strong>HSL:</strong> <span id="clr-hsl-out">hsl(239, 84%, 67%)</span> <button class="copy-btn" onclick="copyInner('clr-hsl-out')">Copy</button></div>
                </div>
            </div>`,
        init: () => {
            const hexToRgb = (hex) => {
                hex = hex.replace('#', '');
                if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
                return { r: parseInt(hex.substr(0,2),16), g: parseInt(hex.substr(2,2),16), b: parseInt(hex.substr(4,2),16) };
            };
            const rgbToHsl = (r,g,b) => {
                r/=255; g/=255; b/=255;
                const max=Math.max(r,g,b), min=Math.min(r,g,b), l=(max+min)/2;
                let h,s;
                if(max===min) { h=s=0; }
                else {
                    const d=max-min;
                    s=l>0.5?d/(2-max-min):d/(max+min);
                    switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}
                }
                return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
            };
            const updateColor = (hex) => {
                const rgb = hexToRgb(hex);
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                document.getElementById('clr-preview').style.background = hex;
                document.getElementById('clr-r').textContent = rgb.r;
                document.getElementById('clr-g').textContent = rgb.g;
                document.getElementById('clr-b').textContent = rgb.b;
                document.getElementById('clr-hex-out').textContent = hex;
                document.getElementById('clr-rgb-out').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                document.getElementById('clr-hsl-out').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            };
            document.getElementById('clr-picker').addEventListener('input', (e) => {
                document.getElementById('clr-hex').value = e.target.value;
                updateColor(e.target.value);
            });
            document.getElementById('clr-hex').addEventListener('input', (e) => {
                let val = e.target.value;
                if (/^#[0-9a-f]{6}$/i.test(val)) {
                    document.getElementById('clr-picker').value = val;
                    updateColor(val);
                }
            });
            window.copyInner = (id) => {
                navigator.clipboard.writeText(document.getElementById(id).textContent);
            };
        }
    },

    'number-base': {
        title: 'Number Base Converter',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div><label>Decimal:</label><input type="text" id="nb-dec" placeholder="255"></div>
                    <div><label>Binary:</label><input type="text" id="nb-bin" placeholder="11111111"></div>
                </div>
                <div class="row">
                    <div><label>Octal:</label><input type="text" id="nb-oct" placeholder="377"></div>
                    <div><label>Hexadecimal:</label><input type="text" id="nb-hex" placeholder="FF"></div>
                </div>
            </div>`,
        init: () => {
            const update = (source) => {
                let val;
                try {
                    switch(source) {
                        case 'dec': val = parseInt(document.getElementById('nb-dec').value, 10); break;
                        case 'bin': val = parseInt(document.getElementById('nb-bin').value, 2); break;
                        case 'oct': val = parseInt(document.getElementById('nb-oct').value, 8); break;
                        case 'hex': val = parseInt(document.getElementById('nb-hex').value, 16); break;
                    }
                    if (isNaN(val)) return;
                    if (source !== 'dec') document.getElementById('nb-dec').value = val;
                    if (source !== 'bin') document.getElementById('nb-bin').value = val.toString(2);
                    if (source !== 'oct') document.getElementById('nb-oct').value = val.toString(8);
                    if (source !== 'hex') document.getElementById('nb-hex').value = val.toString(16).toUpperCase();
                } catch(e) {}
            };
            ['dec','bin','oct','hex'].forEach(id => {
                document.getElementById('nb-' + id).addEventListener('input', () => update(id));
            });
        }
    },

    'unix-timestamp': {
        title: 'Unix Timestamp Converter',
        render: () => `
            <div class="tool-area">
                <div class="stats">
                    <div class="stat"><span class="num" id="ut-now" style="font-size:1.2rem">-</span><span class="label">Current Timestamp</span></div>
                </div>
                <div class="row">
                    <div>
                        <label>Unix Timestamp:</label>
                        <input type="text" id="ut-ts" placeholder="1700000000">
                    </div>
                    <div>
                        <label>Human Date:</label>
                        <input type="text" id="ut-date" placeholder="2024-01-01 00:00:00">
                    </div>
                </div>
                <div class="btn-group">
                    <button class="btn" onclick="tsToDate()">Timestamp → Date</button>
                    <button class="btn" onclick="dateToTs()">Date → Timestamp</button>
                    <button class="btn btn-secondary" onclick="setNow()">Use Current Time</button>
                </div>
                <div class="output-box" id="ut-output"></div>
            </div>`,
        init: () => {
            const updateNow = () => { document.getElementById('ut-now').textContent = Math.floor(Date.now()/1000); };
            updateNow(); setInterval(updateNow, 1000);
            window.setNow = () => { document.getElementById('ut-ts').value = Math.floor(Date.now()/1000); window.tsToDate(); };
            window.tsToDate = () => {
                const ts = parseInt(document.getElementById('ut-ts').value);
                if (isNaN(ts)) return;
                const d = new Date(ts * 1000);
                const out = document.getElementById('ut-output');
                out.textContent = `UTC: ${d.toUTCString()}\nLocal: ${d.toLocaleString()}\nISO: ${d.toISOString()}`;
                document.getElementById('ut-date').value = d.toISOString().replace('T', ' ').replace(/\.\d+Z/, '');
            };
            window.dateToTs = () => {
                const d = new Date(document.getElementById('ut-date').value);
                if (isNaN(d)) { document.getElementById('ut-output').textContent = 'Invalid date'; return; }
                const ts = Math.floor(d.getTime()/1000);
                document.getElementById('ut-ts').value = ts;
                document.getElementById('ut-output').textContent = `Timestamp: ${ts}\nMilliseconds: ${d.getTime()}`;
            };
        }
    },

    'unit-converter': {
        title: 'Unit Converter',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div>
                        <label>Category:</label>
                        <select id="uc-cat" onchange="updateUnits()">
                            <option value="length">Length</option>
                            <option value="weight">Weight</option>
                            <option value="temperature">Temperature</option>
                            <option value="data">Data Size</option>
                            <option value="time">Time</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label>From:</label>
                        <input type="text" id="uc-val" placeholder="1" oninput="convertUnit()">
                        <select id="uc-from" onchange="convertUnit()"></select>
                    </div>
                    <div>
                        <label>To:</label>
                        <div class="output-box" id="uc-result" style="min-height:40px;margin-top:0.5rem"></div>
                        <select id="uc-to" onchange="convertUnit()"></select>
                    </div>
                </div>
            </div>`,
        init: () => {
            const units = {
                length: { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.344, yd:0.9144, ft:0.3048, in:0.0254 },
                weight: { kg:1, g:0.001, mg:0.000001, lb:0.453592, oz:0.0283495, ton:1000 },
                data: { B:1, KB:1024, MB:1048576, GB:1073741824, TB:1099511627776 },
                time: { s:1, ms:0.001, min:60, hr:3600, day:86400, week:604800, year:31536000 }
            };
            const populateSelects = () => {
                const cat = document.getElementById('uc-cat').value;
                const from = document.getElementById('uc-from');
                const to = document.getElementById('uc-to');
                from.innerHTML = ''; to.innerHTML = '';
                if (cat === 'temperature') {
                    ['°C','°F','K'].forEach(u => { from.innerHTML += `<option>${u}</option>`; to.innerHTML += `<option>${u}</option>`; });
                    to.value = '°F';
                } else {
                    Object.keys(units[cat]).forEach(u => { from.innerHTML += `<option>${u}</option>`; to.innerHTML += `<option>${u}</option>`; });
                    const keys = Object.keys(units[cat]);
                    if (keys.length > 1) to.value = keys[1];
                }
            };
            window.updateUnits = () => { populateSelects(); window.convertUnit(); };
            window.convertUnit = () => {
                const cat = document.getElementById('uc-cat').value;
                const val = parseFloat(document.getElementById('uc-val').value);
                const from = document.getElementById('uc-from').value;
                const to = document.getElementById('uc-to').value;
                if (isNaN(val)) { document.getElementById('uc-result').textContent = ''; return; }
                let result;
                if (cat === 'temperature') {
                    let celsius;
                    if (from === '°C') celsius = val;
                    else if (from === '°F') celsius = (val - 32) * 5/9;
                    else celsius = val - 273.15;
                    if (to === '°C') result = celsius;
                    else if (to === '°F') result = celsius * 9/5 + 32;
                    else result = celsius + 273.15;
                } else {
                    result = val * units[cat][from] / units[cat][to];
                }
                document.getElementById('uc-result').textContent = parseFloat(result.toPrecision(10));
            };
            populateSelects();
        }
    },

    // ==================== GENERATORS ====================

    'password-gen': {
        title: 'Password Generator',
        render: () => `
            <div class="tool-area">
                <div class="slider-group">
                    <label>Length:</label>
                    <input type="range" id="pg-len" min="4" max="128" value="16" oninput="document.getElementById('pg-len-val').textContent=this.value;genPassword()">
                    <span class="val" id="pg-len-val">16</span>
                </div>
                <div class="checkbox-group">
                    <label><input type="checkbox" id="pg-upper" checked onchange="genPassword()"> Uppercase (A-Z)</label>
                    <label><input type="checkbox" id="pg-lower" checked onchange="genPassword()"> Lowercase (a-z)</label>
                    <label><input type="checkbox" id="pg-nums" checked onchange="genPassword()"> Numbers (0-9)</label>
                    <label><input type="checkbox" id="pg-syms" checked onchange="genPassword()"> Symbols (!@#$)</label>
                </div>
                <div style="display:flex;gap:0.5rem;align-items:center;margin:1rem 0">
                    <div class="output-box" id="pg-output" style="flex:1;font-size:1.1rem;letter-spacing:1px"></div>
                    <button class="btn" onclick="genPassword()">⟳</button>
                    <button class="copy-btn" onclick="copyText('pg-output')">Copy</button>
                </div>
                <div id="pg-strength" style="font-size:0.9rem"></div>
            </div>`,
        init: () => {
            window.genPassword = () => {
                const len = parseInt(document.getElementById('pg-len').value);
                let chars = '';
                if (document.getElementById('pg-upper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if (document.getElementById('pg-lower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
                if (document.getElementById('pg-nums').checked) chars += '0123456789';
                if (document.getElementById('pg-syms').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
                if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
                const arr = new Uint32Array(len);
                crypto.getRandomValues(arr);
                let pw = '';
                for (let i = 0; i < len; i++) pw += chars[arr[i] % chars.length];
                document.getElementById('pg-output').textContent = pw;
                const entropy = Math.floor(len * Math.log2(chars.length));
                let strength = 'Weak', color = 'var(--danger)';
                if (entropy > 80) { strength = 'Very Strong'; color = 'var(--success)'; }
                else if (entropy > 60) { strength = 'Strong'; color = 'var(--success)'; }
                else if (entropy > 40) { strength = 'Moderate'; color = 'var(--warning)'; }
                document.getElementById('pg-strength').innerHTML = `Strength: <strong style="color:${color}">${strength}</strong> (${entropy} bits of entropy)`;
            };
            window.genPassword();
        }
    },

    'uuid-gen': {
        title: 'UUID Generator',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div>
                        <label>Count:</label>
                        <input type="text" id="uuid-count" value="5">
                    </div>
                    <div>
                        <label>Format:</label>
                        <select id="uuid-format">
                            <option value="default">Standard (with dashes)</option>
                            <option value="nodash">No dashes</option>
                            <option value="upper">UPPERCASE</option>
                            <option value="braces">{Braces}</option>
                        </select>
                    </div>
                </div>
                <div class="btn-group">
                    <button class="btn" onclick="genUUIDs()">Generate</button>
                    <button class="copy-btn" onclick="copyText('uuid-output')">Copy All</button>
                </div>
                <div class="output-box" id="uuid-output" style="min-height:120px"></div>
            </div>`,
        init: () => {
            window.genUUIDs = () => {
                const count = Math.min(parseInt(document.getElementById('uuid-count').value) || 5, 100);
                const format = document.getElementById('uuid-format').value;
                let results = [];
                for (let i = 0; i < count; i++) {
                    let uuid = crypto.randomUUID();
                    if (format === 'nodash') uuid = uuid.replace(/-/g, '');
                    else if (format === 'upper') uuid = uuid.toUpperCase();
                    else if (format === 'braces') uuid = '{' + uuid + '}';
                    results.push(uuid);
                }
                document.getElementById('uuid-output').textContent = results.join('\n');
            };
            window.genUUIDs();
        }
    },

    'hash-gen': {
        title: 'Hash Generator',
        render: () => `
            <div class="tool-area">
                <label>Input text:</label>
                <textarea id="hash-input" rows="4" placeholder="Enter text to hash..."></textarea>
                <button class="btn" onclick="genHashes()" style="margin:1rem 0">Generate Hashes</button>
                <div id="hash-results"></div>
            </div>`,
        init: () => {
            window.genHashes = async () => {
                const text = document.getElementById('hash-input').value;
                const encoder = new TextEncoder();
                const data = encoder.encode(text);
                const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
                let html = '';
                for (const algo of algos) {
                    const hash = await crypto.subtle.digest(algo, data);
                    const hex = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
                    html += `<div style="margin-bottom:0.75rem">
                        <strong>${algo}:</strong> <button class="copy-btn" onclick="navigator.clipboard.writeText('${hex}')">Copy</button>
                        <div class="output-box" style="margin-top:0.25rem;font-size:0.8rem">${hex}</div>
                    </div>`;
                }
                document.getElementById('hash-results').innerHTML = html;
            };
        }
    },

    'qr-gen': {
        title: 'QR Code Generator',
        render: () => `
            <div class="tool-area">
                <label>Text or URL:</label>
                <input type="text" id="qr-input" placeholder="https://example.com" value="https://example.com">
                <div class="row" style="margin-top:1rem">
                    <div>
                        <label>Size:</label>
                        <select id="qr-size">
                            <option value="200">200x200</option>
                            <option value="300" selected>300x300</option>
                            <option value="400">400x400</option>
                            <option value="500">500x500</option>
                        </select>
                    </div>
                    <div><button class="btn" onclick="genQR()" style="margin-top:1.5rem">Generate QR Code</button></div>
                </div>
                <div id="qr-output" style="text-align:center;margin-top:1rem"></div>
                <p style="color:var(--text-muted);font-size:0.8rem;margin-top:0.5rem;text-align:center">Uses the QR Server API to generate codes</p>
            </div>`,
        init: () => {
            window.genQR = () => {
                const text = encodeURIComponent(document.getElementById('qr-input').value);
                const size = document.getElementById('qr-size').value;
                document.getElementById('qr-output').innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${text}" alt="QR Code" style="border-radius:8px;max-width:100%">`;
            };
            window.genQR();
        }
    },

    'favicon-gen': {
        title: 'Emoji Favicon Generator',
        render: () => `
            <div class="tool-area">
                <label>Pick an emoji:</label>
                <input type="text" id="fav-emoji" value="🚀" style="font-size:2rem;text-align:center;width:80px">
                <canvas id="fav-canvas" width="64" height="64" style="display:none"></canvas>
                <div style="margin:1rem 0">
                    <button class="btn" onclick="genFavicon()">Generate Favicon</button>
                </div>
                <div id="fav-preview" style="text-align:center"></div>
                <div style="margin-top:1rem">
                    <label>Copy this HTML into your &lt;head&gt;:</label>
                    <div class="output-box" id="fav-code"></div>
                </div>
            </div>`,
        init: () => {
            window.genFavicon = () => {
                const emoji = document.getElementById('fav-emoji').value;
                const canvas = document.getElementById('fav-canvas');
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, 64, 64);
                ctx.font = '56px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(emoji, 32, 35);
                const dataUrl = canvas.toDataURL('image/png');
                document.getElementById('fav-preview').innerHTML = `
                    <img src="${dataUrl}" style="width:64px;height:64px;border:1px solid var(--border);border-radius:8px"><br>
                    <a href="${dataUrl}" download="favicon.png" class="btn" style="display:inline-block;margin-top:0.5rem;text-decoration:none">Download PNG</a>`;
                document.getElementById('fav-code').textContent = `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${emoji}</text></svg>">`;
            };
            window.genFavicon();
        }
    },

    'meta-gen': {
        title: 'Meta Tag Generator',
        render: () => `
            <div class="tool-area">
                <div class="row">
                    <div><label>Page Title:</label><input type="text" id="meta-title" placeholder="My Awesome Page" oninput="genMeta()"></div>
                </div>
                <label>Description:</label>
                <textarea id="meta-desc" rows="2" placeholder="A brief description of your page..." oninput="genMeta()"></textarea>
                <div class="row">
                    <div><label>Keywords (comma-separated):</label><input type="text" id="meta-keywords" placeholder="web, tools, free" oninput="genMeta()"></div>
                    <div><label>Author:</label><input type="text" id="meta-author" placeholder="Your Name" oninput="genMeta()"></div>
                </div>
                <div class="row">
                    <div><label>URL:</label><input type="text" id="meta-url" placeholder="https://example.com" oninput="genMeta()"></div>
                    <div><label>Image URL:</label><input type="text" id="meta-image" placeholder="https://example.com/image.png" oninput="genMeta()"></div>
                </div>
                <label>Generated Meta Tags: <button class="copy-btn" onclick="copyText('meta-output')">Copy</button></label>
                <div class="output-box" id="meta-output" style="min-height:200px"></div>
            </div>`,
        init: () => {
            window.genMeta = () => {
                const title = document.getElementById('meta-title').value;
                const desc = document.getElementById('meta-desc').value;
                const keywords = document.getElementById('meta-keywords').value;
                const author = document.getElementById('meta-author').value;
                const url = document.getElementById('meta-url').value;
                const image = document.getElementById('meta-image').value;
                let tags = '';
                if (title) tags += `<title>${title}</title>\n`;
                if (desc) tags += `<meta name="description" content="${desc}">\n`;
                if (keywords) tags += `<meta name="keywords" content="${keywords}">\n`;
                if (author) tags += `<meta name="author" content="${author}">\n`;
                tags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n`;
                tags += `<!-- Open Graph / Facebook -->\n`;
                if (title) tags += `<meta property="og:title" content="${title}">\n`;
                if (desc) tags += `<meta property="og:description" content="${desc}">\n`;
                if (url) tags += `<meta property="og:url" content="${url}">\n`;
                if (image) tags += `<meta property="og:image" content="${image}">\n`;
                tags += `<meta property="og:type" content="website">\n\n`;
                tags += `<!-- Twitter -->\n`;
                tags += `<meta name="twitter:card" content="summary_large_image">\n`;
                if (title) tags += `<meta name="twitter:title" content="${title}">\n`;
                if (desc) tags += `<meta name="twitter:description" content="${desc}">\n`;
                if (image) tags += `<meta name="twitter:image" content="${image}">\n`;
                document.getElementById('meta-output').textContent = tags;
            };
        }
    }
};
