/* 全局参数初始化 */

// 方块大小 //这个数字一般不做变动？
var block_size = 9.5;

// 方块布局（自动生成版）
// 方块布局生成函数
function generateBlockArrangement(rows, cols, step) {
    var block_arrangement = [];
    var topLeftX = 0;
    var topLeftY = 0;

    for (var y = topLeftY; y <= topLeftY + step * (rows - 1); y += step) {
        for (var x = topLeftX; x <= topLeftX + step * (cols - 1); x += step) {
            block_arrangement.push({ x: x, y: y });
        }
    }
    return block_arrangement;
};

// 方块布局偏移函数
function offsetBlockArrangement(arrangement_array, offset) {
    for (var i = 0; i < arrangement_array.length; i++ ) {
        arrangement_array[i].x = arrangement_array[i].x + offset
        arrangement_array[i].y = arrangement_array[i].y + offset
    }
};

// 生成方块布局
var block_arrangement_5 = generateBlockArrangement(5, 5, 10);
offsetBlockArrangement(block_arrangement_5, 30);

var block_arrangement_6 = generateBlockArrangement(6, 6, 10);
offsetBlockArrangement(block_arrangement_6, 25);

var block_arrangement_7 = generateBlockArrangement(7, 7, 10);
offsetBlockArrangement(block_arrangement_7, 20);

// 方块布局（手写版）
/*
var block_arrangement_5 = [
    { x: 30, y: 30 }, { x: 40, y: 30 }, { x: 50, y: 30 }, { x: 60, y: 30 }, { x: 70, y: 30 },
    { x: 30, y: 40 }, { x: 40, y: 40 }, { x: 50, y: 40 }, { x: 60, y: 40 }, { x: 70, y: 40 },
    { x: 30, y: 50 }, { x: 40, y: 50 }, { x: 50, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 50 },
    { x: 30, y: 60 }, { x: 40, y: 60 }, { x: 50, y: 60 }, { x: 60, y: 60 }, { x: 70, y: 60 },
    { x: 30, y: 70 }, { x: 40, y: 70 }, { x: 50, y: 70 }, { x: 60, y: 70 }, { x: 70, y: 70 },
];

var block_arrangement_6 = [
    { x: 25, y: 25 }, { x: 35, y: 25 }, { x: 45, y: 25 }, { x: 55, y: 25 }, { x: 65, y: 25 }, { x: 75, y: 25 },
    { x: 25, y: 35 }, { x: 35, y: 35 }, { x: 45, y: 35 }, { x: 55, y: 35 }, { x: 65, y: 35 }, { x: 75, y: 35 },
    { x: 25, y: 45 }, { x: 35, y: 45 }, { x: 45, y: 45 }, { x: 55, y: 45 }, { x: 65, y: 45 }, { x: 75, y: 45 },
    { x: 25, y: 55 }, { x: 35, y: 55 }, { x: 45, y: 55 }, { x: 55, y: 55 }, { x: 65, y: 55 }, { x: 75, y: 55 },
    { x: 25, y: 65 }, { x: 35, y: 65 }, { x: 45, y: 65 }, { x: 55, y: 65 }, { x: 65, y: 65 }, { x: 75, y: 65 },
    { x: 25, y: 75 }, { x: 35, y: 75 }, { x: 45, y: 75 }, { x: 55, y: 75 }, { x: 65, y: 75 }, { x: 75, y: 75 },
];

var block_arrangement_7 = [
    { x: 20, y: 20 }, { x: 30, y: 20 }, { x: 40, y: 20 }, { x: 50, y: 20 }, { x: 60, y: 20 }, { x: 70, y: 20 }, { x: 80, y: 20 },
    { x: 20, y: 30 }, { x: 30, y: 30 }, { x: 40, y: 30 }, { x: 50, y: 30 }, { x: 60, y: 30 }, { x: 70, y: 30 }, { x: 80, y: 30 },
    { x: 20, y: 40 }, { x: 30, y: 40 }, { x: 40, y: 40 }, { x: 50, y: 40 }, { x: 60, y: 40 }, { x: 70, y: 40 }, { x: 80, y: 40 },
    { x: 20, y: 50 }, { x: 30, y: 50 }, { x: 40, y: 50 }, { x: 50, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 50 }, { x: 80, y: 50 },
    { x: 20, y: 60 }, { x: 30, y: 60 }, { x: 40, y: 60 }, { x: 50, y: 60 }, { x: 60, y: 60 }, { x: 70, y: 60 }, { x: 80, y: 60 },
    { x: 20, y: 70 }, { x: 30, y: 70 }, { x: 40, y: 70 }, { x: 50, y: 70 }, { x: 60, y: 70 }, { x: 70, y: 70 }, { x: 80, y: 70 },
    { x: 20, y: 80 }, { x: 30, y: 80 }, { x: 40, y: 80 }, { x: 50, y: 80 }, { x: 60, y: 80 }, { x: 70, y: 80 }, { x: 80, y: 80 },
];
*/

// 生成序列数字的函数
function generateSequence(index_max) {
    var array = [];
    for (var i = 0; i < index_max; i++) {
        array.push(i);
    }
    return array
};

// 外部储存数据用的变量，在全局初始化
var local_sequence = [];
var error_times = 0;
var correct_times = 0;

// 方块ID列表，用在随机化函数里面
var block_id_list_5 = generateSequence(25);
var block_id_list_6 = generateSequence(36);
var block_id_list_7 = generateSequence(49);

// 测试区域长宽（有可能做针对屏幕的修改吗？（或许并不需要））
var display_width = "800px";
var display_height = "800px";

// 难度变量，等于本次trial中的方块个数，在实验中进行调整
var difficulty = 2; //初始值为2
// 当刺激方块个数在 2~11 之间时，盘面为5*5，最低不小于2
// 当刺激方块个数在 12~17 之间时，盘面为6*6
// 当刺激方块个数在 18~24 之间时，盘面为7*7，最大不超过24

let participant_index;
let gender;
let age;

// 随机抽取算法，用来在索引列表中抽取数个方块作为本轮刺激
function getRandomElements(array, x) {
    const newArray = array
    const shuffledArray = newArray.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, x);
};

// 和timer有关的部分
var timer_status = true; //初始值为T，计时器结束后为F
var timer_started = false; //计时器开没开
function updateTimer() {
    timer_status = false;
    console.log("The timer has ended!")
};

/* 初始化jsPsych，注意添加的实验强制退出 */
let jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data
            .get()
            .addToAll({ subject_index: participant_index, gender: gender, age: age, experiment_name: 'CORSI-training' })
            .localSave('csv', 'data-'.concat(Date(0).toLocaleString('zh-CN')).concat('.csv'))
    },
    on_close: function () {
        jsPsych.data
            .get()
            .addToAll({ subject_index: participant_index, gender: gender, age: age, experiment_name: 'CORSI-training' })
            .localSave('csv', 'data-'.concat(Date(0).toLocaleString('zh-CN')).concat('.csv'))
    }
});

// 注册一个listener，用于实验强制退出 //不太对，整个实验没有开放keyboard response，好像读不到按ESC的事件
function endExperiment(e) {
    if (e.key === 'Escape') {
        jsPsych.endExperiment('实验已终止');
        document.removeEventListener("keydown", endExperiment);
    }
};

// 数据收集
let data_collect = {
    type: jsPsychSurveyHtmlForm,
    css_classes: ['non-experiment'],
    html: `
    <p>您的编号：<input type="text" name="participant_index" style="color:black" placeholder="如不知道，请询问实验人员"></p>
    <p>您的性别：<input type="radio" name="gender" value = "1" >男<input type="radio" name="gender" value = "2" >女</p>
    <p>您的年龄：<input type="text" name="age" style="color:black" placeholder="请输入阿拉伯数字，如23"></p>
    `,
    button_label: '提交',
    on_finish: function (data) {
        console.log(data.response);

        participant_index = data.response.participant_index;
        gender = data.response.gender;
        age = data.response.age;
    }
};


// 指导语
let instruction = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class='experiment-instruction'> 
    <p>
    同学们好，接下来要进行的是打地鼠游戏
    </p>

    <p>
    游戏开始以后，屏幕上会出现黑色的方块，在这些黑色的方块中会按照顺序<br>
    依次出现<span style="color:red">红色边框的地鼠</span>，请记住这些<span style="color:red">地鼠出现的顺序和位置</span><br>
    一段时间以后，这些地鼠会消失，等待一段时间，当方块下方出现“请回忆”<br>
    的字以后，请用鼠标点击<span style="color:red">按顺序</span>回忆出现过的地鼠的位置<br>
    请注意，是按照地鼠出现的顺序回忆哦~
    </p>

    <p>
    当你连续回答正确两次以后，会进入下一关，出现的地鼠的数量会增加一个<br>
    当你连续回答错误两次之后，游戏将会结束。<br>
    你是否明白规则了呢？现在点击屏幕开始游戏吧~
    </p>
    </div>
    `,
    post_trial_gap: 500,
    button_html: '<button class="jspsych-btn">%choice%</button>',
    choices: ["开始"],
    on_start: function () {
        document.addEventListener("keydown", endExperiment)
    }
};

let difficulty_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => "下一个试次的老鼠个数为："+difficulty,
    choices: ["继续"],
    css_classes: 'experiment-difficulty',
    button_html: '<button class="jspsych-btn">%choice%</button>',
    post_trial_gap: 500,
};

// 5盘面的timeline，作为子时间线运行
let timeline_5 = {
    timeline: [
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_5,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                let randomized_array = getRandomElements(block_id_list_5, difficulty);
                local_sequence = [...randomized_array];
                return randomized_array;
            },
            mode: 'display',
            prompt: "请记忆"
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_5,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                let original_list = [...local_sequence];
                // let reversed_list = original_list.reverse();
                return original_list;
            },
            mode: 'wait',
            wait_duration: 5000,
            prompt: "请等待"
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_5,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                let original_list = [...local_sequence];
                // let reversed_list = original_list.reverse();
                return original_list;
            },
            mode: 'input',
            prompt: "请回忆"
        }
    ],
    conditional_function: function () {
        let local_difficulty = difficulty;
        if (local_difficulty <= 11) {
            return true;
        }
        else {
            return false;
        };
    },
};

// 6盘面的timeline，作为子时间线运行
let timeline_6 = {
    timeline: [
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_6,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                let randomized_array = getRandomElements(block_id_list_6, difficulty);
                local_sequence = [...randomized_array];
                return randomized_array;
            },
            mode: 'display',
            prompt: "请记忆"
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_6,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                let original_list = [...local_sequence];
                // let reversed_list = original_list.reverse();
                return original_list;
            },
            mode: 'wait',
            wait_duration: 5000,
            prompt: "请等待"
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_6,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                let original_list = [...local_sequence];
                // let reversed_list = original_list.reverse();
                return original_list;
            },
            mode: 'input',
            prompt: "请回忆"
        }
    ],
    conditional_function: function () {
        let local_difficulty = difficulty;
        if (local_difficulty >= 12 && local_difficulty <= 17) {
            return true;
        }
        else {
            return false;
        };
    },
};

// 7盘面的timeline，作为子时间线运行
let timeline_7 = {
    timeline: [
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_7,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                let randomized_array = getRandomElements(block_id_list_7, difficulty);
                local_sequence = [...randomized_array];
                return randomized_array;
            },
            mode: 'display',
            prompt: "请记忆"
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_7,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                let original_list = [...local_sequence];
                // let reversed_list = original_list.reverse();
                return original_list;
            },
            mode: 'wait',
            wait_duration: 5000,
            prompt: "请等待"
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_7,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                let original_list = [...local_sequence];
                // let reversed_list = original_list.reverse();
                return original_list;
            },
            mode: 'input',
            prompt: "请回忆"
        }
    ],
    conditional_function: function () {
        let local_difficulty = difficulty;
        if (local_difficulty >= 18) {
            return true;
        }
        else {
            return false;
        };
    },
};

// timeline_control，用来控制运行哪一个timeline
let timeline_control = {
    on_timeline_start: function () {
        if (timer_started == false) {
            setTimeout(updateTimer, 360000); //六分钟的计时器
            console.log("The timer has started!");
            timer_started = true;
        }
    },
    timeline: [difficulty_screen, timeline_5, timeline_6, timeline_7],   //按顺序遍历三个timeline，在每个timeline里单独用conditional_function控制
    loop_function: function () {
        let last_trial_correct = jsPsych.data.getLastTrialData().trials[0].correct;
        if (last_trial_correct == true) {
            correct_times++;
            error_times = 0;

            if (correct_times > 1) {
                correct_times = 0;
                if (difficulty < 24) {
                    difficulty++;
                }
            }
        }
        else {
            error_times++;
            correct_times = 0;

            if (error_times > 1) {
                error_times = 0; 
                if (difficulty > 2) {
                    difficulty--;
                }
            }
        };
        return timer_status;
    },
    data: {
        is_trial: true,
    },
    on_finish: function (data) {
        data.difficulty = difficulty;
        data.error_times = error_times;
    }
};

// 结束语
let ending = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class='experiment-instruction'><p>实验已结束</p></div>
    `,
    post_trial_gap: 500,
    button_html: '<button class="jspsych-btn">%choice%</button>',
    choices: ["结束"],
    on_start: function () {
        document.removeEventListener("keydown", endExperiment)
    }
};

/* jsPsych 运行*/
jsPsych.run([
    data_collect, instruction, timeline_control, ending
]);

