// 定义jsPsychCorsiBlocks模块，使用立即执行函数包裹
var jsPsychCorsiBlocks = (function (jspsych) {
    'use strict';

    // 定义插件信息，包括名称和参数
    const info = {
        name: "corsi-blocks",
        parameters: {
            /**
             * 一个指定要显示的序列顺序的块索引数组。例如，
             * [0, 1, 2, 3, 4] 将按照blocks参数中的顺序显示前5个块。
             */
            sequence: {
                type: jspsych.ParameterType.INT,
                default: undefined,
                array: true,
            },
            /**
             * 一个指定每个块的x和y坐标的对象数组。坐标表示块的中心，
             * 并以显示宽度和高度的百分比表示。例如，
             * {x: 50, y: 50} 将把块放置在显示的中心。
             *
             * 默认值是一个包含九个块的数组，近似原始Corsi块任务的布局。
             */
            blocks: {
                type: jspsych.ParameterType.COMPLEX,
                array: true,
                default: [
                    { y: 80, x: 45 },
                    { y: 94, x: 80 },
                    { y: 70, x: 20 },
                    { y: 60, x: 70 },
                    { y: 50, x: 35 },
                    { y: 40, x: 6 },
                    { y: 45, x: 94 },
                    { y: 25, x: 60 },
                    { y: 6, x: 47 },
                ],
                nested: {
                    x: {
                        type: jspsych.ParameterType.INT,
                        default: undefined,
                    },
                    y: {
                        type: jspsych.ParameterType.INT,
                        default: undefined,
                    },
                },
            },
            /**
             * 块的大小，作为整体显示大小的百分比。
             */
            block_size: {
                type: jspsych.ParameterType.INT,
                default: 12,
            },
            /**
             * 显示的宽度，以有效的CSS测量方式指定。
             */
            display_width: {
                type: jspsych.ParameterType.STRING,
                default: "400px",
            },
            /**
             * 显示的高度，以有效的CSS测量方式指定。
             */
            display_height: {
                type: jspsych.ParameterType.STRING,
                default: "400px",
            },
            /**
             * 可选的文本提示，可以显示在显示区域下方。
             */
            prompt: {
                type: jspsych.ParameterType.STRING,
                default: null,
            },
            /**
             * 试验的模式。如果是'display'，则显示序列并在序列完成后结束试验。
             * 如果是'input'，则用户必须按照正确的顺序点击块。
             */
            mode: {
                type: jspsych.ParameterType.STRING,
                default: "display",
                options: ["display", "input"],
            },
            /**
             * 每个序列块之间的持续时间，以毫秒为单位。
             */
            sequence_gap_duration: {
                type: jspsych.ParameterType.INT,
                default: 250,
            },
            /**
             * 在序列期间显示每个块的持续时间，以毫秒为单位。
             */
            sequence_block_duration: {
                type: jspsych.ParameterType.INT,
                default: 1000,
            },
            /**
             * 在序列开始之前显示块的持续时间，以毫秒为单位。
             */
            pre_stim_duration: {
                type: jspsych.ParameterType.INT,
                default: 500,
            },
            /**
             * 在输入模式下显示反馈响应动画的持续时间，以毫秒为单位。
             */
            response_animation_duration: {
                type: jspsych.ParameterType.INT,
                default: 500,
            },
            /**
             * 未选择、未突出显示的块的颜色。
             */
            block_color: {
                type: jspsych.ParameterType.STRING,
                default: "#8a898b",
            },
            /**
             * 突出显示块的颜色。
             */
            highlight_image: {
                type: jspsych.ParameterType.STRING,
                default: "img/laoshu.png",
            },
            /**
             * 正确反馈的颜色。
             */
            correct_color: {
                type: jspsych.ParameterType.STRING,
                default: "#00ff00",
            },
            /**
             * 不正确反馈的颜色。
             */
            incorrect_color: {
                type: jspsych.ParameterType.STRING,
                default: "#ff0000",
            },
        },
    };
    /**
     * **corsi-blocks**
     *
     * 该插件显示一系列块，然后获取被试者的响应。
     * 该序列可以在'display'模式或'input'模式下显示。
     * 在'display'模式下，显示序列并在序列完成后结束试验。
     * 在'input'模式下，被试者必须按照正确的顺序点击块。
     *
     * @author Josh de Leeuw
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class CorsiBlocksPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        // 定义试验方法
        trial(display_element, trial) {
            let css = `<style id="jspsych-corsi-css">
        #jspsych-corsi-stimulus { 
          position: relative; 
          width:${trial.display_width}; 
          height:${trial.display_height};
        }
        .jspsych-corsi-block { 
          background-color: ${trial.block_color}; 
          position: absolute; 
          width: ${trial.block_size}%; 
          height: ${trial.block_size}%;
          transform: translate(-50%, -50%);
        }
        #jspsych-corsi-prompt { 
          position: absolute; 
          text-align: center; 
          width: ${trial.display_width}; 
          top: 100%; 
        }
        #jspsych-corsi-prompt p { 
          font-size: 18px; 
        }
        ${trial.mode == "input" ? ".jspsych-corsi-block { cursor: pointer; }" : ""}
      </style>`;
            let html = css;
            html += '<div id="jspsych-corsi-stimulus">';
            for (let i = 0; i < trial.blocks.length; i++) {
                html += `<div class="jspsych-corsi-block" data-id="${i}" style="top:${trial.blocks[i].y}%; left:${trial.blocks[i].x}%;"></div>`;
            }
            if (trial.prompt != null) {
                html += `<div id="jspsych-corsi-prompt"><p>${trial.prompt}</p></div>`;
            }
            html += "</div>";
            display_element.innerHTML = html;
            const start_time = performance.now();
            // 定义试验数据对象
            const trial_data = {
                sequence: trial.sequence,
                response: [],
                rt: [],
                blocks: trial.blocks,
                correct: null,
            };
            // 定义结束试验的函数
            const end_trial = () => {
                display_element.innerHTML = "";
                this.jsPsych.finishTrial(trial_data);
            };
            // 定义等待函数
            const wait = function (fn, t) {
                const start = performance.now();
                const _wait_help = (fn, t, s) => {
                    const duration = performance.now() - s;
                    if (duration >= t) {
                        fn();
                    }
                    else {
                        window.requestAnimationFrame(() => _wait_help(fn, t, start));
                    }
                };
                window.requestAnimationFrame(() => _wait_help(fn, t, start));
            };
            // 根据试验模式执行不同的逻辑
            if (trial.mode == "display") {
                let sequence_location = 0;
                let display_phase = "pre-stim";
                // 更新显示的函数
                const update_display = () => {
                    if (display_phase == "pre-stim") {
                        wait(update_display, trial.pre_stim_duration);
                        display_phase = "sequence";
                    }
                    else if (display_phase == "sequence") {
                        const block = display_element.querySelector(`.jspsych-corsi-block[data-id="${trial.sequence[sequence_location]}"]`);
                        if (sequence_location < trial.sequence.length) {
                            block.style.backgroundImage = `url('${trial.highlight_image}')`;
                            block.style.backgroundPosition = `center`;
                            block.style.backgroundSize = `cover`;
                            block.style.borderStyle = `solid`;
                            block.style.borderColor = `red`;
                            block.style.borderWidth = `3px`;
                            wait(update_display, trial.sequence_block_duration);
                            display_phase = "iti";
                        }
                        if (sequence_location == trial.sequence.length) {
                            end_trial();
                        }
                    }
                    else if (display_phase == "iti") {
                        const block = display_element.querySelector(`.jspsych-corsi-block[data-id="${trial.sequence[sequence_location]}"]`);
                        //block.style.backgroundImage = 'none'; // 设置为'none'，即没有背景图像
                        sequence_location++;
                        wait(update_display, trial.sequence_gap_duration);
                        display_phase = "sequence";
                    }
                };
                window.requestAnimationFrame(update_display);
            }
            if (trial.mode == "input") {
                // 正确反馈的动画
                const correct_animation = [
                    { backgroundColor: trial.block_color },
                    { backgroundColor: trial.correct_color, offset: 0.2 },
                    { backgroundColor: trial.block_color },
                ];
                // 不正确反馈的动画
                const incorrect_animation = [
                    { backgroundColor: trial.block_color },
                    { backgroundColor: trial.incorrect_color, offset: 0.2 },
                    { backgroundColor: trial.block_color },
                ];
                // 动画的定时设置
                const animation_timing = {
                    duration: trial.response_animation_duration,
                    iterations: 1,
                };
                // 注册点击事件的函数
                const register_click = (id) => {
                    if (trial_data.correct !== null) {
                        return; // 在超时期间的额外点击，不执行任何操作
                    }
                    const rt = Math.round(performance.now() - start_time);
                    trial_data.response.push(parseInt(id));
                    trial_data.rt.push(rt);
                    const correct = parseInt(id) == trial.sequence[trial_data.response.length - 1];
                    if (correct) {
                        display_element
                            .querySelector(`.jspsych-corsi-block[data-id="${id}"]`)
                            .animate(correct_animation, animation_timing);
                        if (trial_data.response.length == trial.sequence.length) {
                            trial_data.correct = true;
                            setTimeout(end_trial, trial.response_animation_duration); // 允许动画完成
                        }
                    }
                    else {
                        display_element
                            .querySelector(`.jspsych-corsi-block[data-id="${id}"]`)
                            .animate(incorrect_animation, animation_timing);
                        trial_data.correct = false;
                        setTimeout(end_trial, trial.response_animation_duration); // 允许动画完成
                    }
                };
                var blocks = display_element.querySelectorAll(".jspsych-corsi-block");
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].addEventListener("click", (e) => {
                        register_click(e.target.getAttribute("data-id"));
                    });
                }
            }
        }
    }
    CorsiBlocksPlugin.info = info;

    return CorsiBlocksPlugin;

})(jsPsychModule);
//# sourceMappingURL=index.browser.js.map
