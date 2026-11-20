import type { Part } from '../types/course';

/**
 * 第四篇：微分学与导数（依据 The Calculus Lifesaver 与 OpenStax Precalculus 2e）
 * 从「差商取极限」出发，把瞬时变化率、切线斜率与求导法则串成一条线，
 * 再走向极值、最优化与相关变化率，最后自然过渡到人工智能里的梯度下降。
 */
export const part4: Part = {
  id: 'part4',
  number: 4,
  title: '微分学与导数',
  subtitle: '从瞬时变化率到智能优化',
  source: 'The Calculus Lifesaver（普林斯顿微积分读本）与 OpenStax Precalculus 2e',
  intro:
    '前面的极限帮我们解决了「无限接近」的问题，这一篇要把它用起来。汽车速度表上那一瞬间的读数、曲线上那一点恰好贴上去的直线、利润最大时的产量、气球膨胀时半径增长的速度——这些看似不相干的问题，背后藏着同一个工具：导数。我们会先从定义把它造出来，再学会一套像搭积木一样的求导法则，最后看着它一路走进机器学习的心脏。',
  goal: '理解导数的极限定义与几何、物理意义；熟练掌握幂、积、商、链式、隐函数等求导法则；能用导数分析函数性态、解决最优化与相关变化率问题；建立梯度与梯度下降的直观图像。',
  chapters: [
    /* ============================ 第一章 导数的定义 ============================ */
    {
      id: 'p4c1',
      number: 1,
      title: '导数的定义',
      intro:
        '这一章回答一个朴素的问题：「某一瞬间变化得多快？」平均变化率我们早就会算，把区间缩到无穷小，它就升级成了导数。我们还要看看导数在图像上长什么样，以及它在什么情况下会不存在。',
      outcomes: [
        '能写出导数的差商极限定义，并解释每个符号',
        '能用定义求简单函数的导数',
        '理解导数是切线斜率，也是瞬时变化率',
        '能区分左导数、右导数，说明可导与连续的关系',
      ],
      topics: [
        {
          id: 'p4c1t1',
          title: '导数的数学定义与差商',
          objective: '能用差商的极限写出导数定义，并用定义求简单函数的导数',
          minutes: 22,
          blocks: {
            background: [
              {
                title: '平均速度不够用了',
                text: '开车 2 小时走 120 公里，平均速度是 60 km/h。可交警拦下你时关心的是「刚才那一瞬间」的速度，不是两小时的平均值。把一小段时间的平均速度算出来，再让这段时间越来越短，短到趋近于零——这个想法就是导数。',
              },
            ],
            plain: [
              {
                text: '想象你在称体重。站上去晃一晃，指针跳来跳去，你读的是「稳定下来的那一刻」。导数也是这个意思：我们不断缩短观察的时间窗口 $\\Delta x$，看平均变化率会不会稳定到某个固定的数。这个稳定下来的值，就是那一瞬间的变化率。',
              },
              {
                text: '中间那个还没取极限的式子 $\\dfrac{f(x+h)-f(x)}{h}$ 叫**差商**，你可以把它当成「在一小段上算出来的平均速度」。$h$ 越小，它越接近真相。',
              },
            ],
            definition: [
              {
                title: '导数的定义',
                text: '函数 $f$ 在点 $x$ 处的导数定义为 $$f\'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$$ 如果这个极限存在，就说 $f$ 在 $x$ 处**可导**。另一种常见写法是 $f\'(x)=\\lim_{\\Delta x\\to0}\\dfrac{f(x+\\Delta x)-f(x)}{\\Delta x}$，两者完全是一回事。',
              },
            ],
            symbols: [
              {
                title: '逐个符号拆开看',
                text: '$h$（也叫 $\\Delta x$）是自变量的**微小增量**，它趋近 0 但永远不等于 0（分母不能是 0）；$f(x+h)-f(x)$ 是函数值的增量，常记作 $\\Delta y$；两者相除得到**差商**，也就是割线斜率；$\\lim_{h\\to0}$ 表示「让 $h$ 无限接近 0」；$f\'(x)$ 读作「$f$ 在 $x$ 处的导数」，右上角那一撇是导数的记号，不是乘方。',
              },
            ],
            figure: {
              kind: 'derivative',
              initialFn: 'x^2',
              caption: '固定曲线上的点 $x$，拖动另一个点让它越来越靠近，观察差商（割线斜率）如何稳定到一个定值。那个定值就是导数。',
            },
            derivation: {
              intro: '为什么要用 $h\\to0$ 的极限来定义瞬时变化率？把过程拆开看就很清楚：',
              steps: [
                { action: '取一小段', latex: '在 $x$ 到 $x+h$ 之间算平均变化率：$\\dfrac{f(x+h)-f(x)}{h}$', why: '这是割线斜率，代表这一小段的平均速度。' },
                { action: '缩短这一小段', latex: '令 $h$ 依次取 $0.1,\\ 0.01,\\ 0.001,\\dots$', why: '观察平均速度是否稳定下来；$h$ 始终不为 0。' },
                { action: '取极限', latex: '$\\lim_{h\\to0}\\dfrac{f(x+h)-f(x)}{h}=L$', why: '若这些值趋向同一个数 $L$，就把 $L$ 定义为瞬时变化率，即导数。' },
              ],
              conclusion: '导数是「$h$ 趋近 0 时差商的极限」，它和「用 $h=0$ 算出来的式子」差别很大，这一字之差绕开了除以 0 的困境。',
            },
            keyFormulas: [
              { latex: 'f\'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}', meaning: '导数的差商极限定义', note: '$h\\to0$ 但 $h\\neq0$，分母不能真的等于 0', display: 'block' },
              { latex: '\\frac{\\Delta y}{\\Delta x}=\\frac{f(x+h)-f(x)}{h}', meaning: '差商 = 这一小段上的平均变化率' },
            ],
            examplesBasic: [
              {
                title: '用定义求 $f(x)=x^2$ 的导数',
                level: 'basic',
                asking: '用导数定义求 $f(x)=x^2$ 在任意点 $x$ 处的导数。',
                given: ['$f(x)=x^2$'],
                method: ['导数的差商极限定义', '完全平方公式展开'],
                steps: [
                  { action: '写出 $f(x+h)$', latex: '$f(x+h)=(x+h)^2=x^2+2xh+h^2$', why: '把 $x+h$ 代进函数，用完全平方公式展开。' },
                  { action: '算函数值增量', latex: '$f(x+h)-f(x)=(x^2+2xh+h^2)-x^2=2xh+h^2$', why: '减去 $f(x)=x^2$，常数项 $x^2$ 抵消。' },
                  { action: '构造差商并约分', latex: '$\\frac{f(x+h)-f(x)}{h}=\\frac{2xh+h^2}{h}=\\frac{h(2x+h)}{h}=2x+h$', why: '分子提出公因式 $h$，与分母约掉（这里 $h\\neq0$）。' },
                  { action: '取极限', latex: '$f\'(x)=\\lim_{h\\to0}(2x+h)=2x$', why: '$h$ 趋近 0，式子稳定到 $2x$。' },
                ],
                result: '$f\'(x)=2x$。',
                check: '在 $x=3$ 处 $f\'(3)=6$。用差商数值验证：$\\frac{(3.001)^2-9}{0.001}=6.001$，非常接近 6 ✓。',
                pitfall: '第二步一定要先展开再相减，别写成 $f(x+h)-f(x)=h^2$，漏掉 $2xh$ 这一项。',
              },
            ],
            examplesAdvanced: [
              {
                title: '用定义求 $f(x)=\\dfrac{1}{x}$ 的导数',
                level: 'advanced',
                asking: '用定义求 $f(x)=\\dfrac{1}{x}$（$x\\neq0$）的导数。',
                given: ['$f(x)=\\dfrac{1}{x}$'],
                method: ['导数的定义', '分式通分'],
                steps: [
                  { action: '写出差商', latex: '$\\frac{f(x+h)-f(x)}{h}=\\frac{\\frac{1}{x+h}-\\frac{1}{x}}{h}$', why: '先把 $x+h$ 和 $x$ 分别代入函数。' },
                  { action: '分子通分', latex: '$\\frac{1}{x+h}-\\frac{1}{x}=\\frac{x-(x+h)}{x(x+h)}=\\frac{-h}{x(x+h)}$', why: '公分母是 $x(x+h)$，分子是 $x-(x+h)=-h$。' },
                  { action: '除以 $h$ 并约分', latex: '$\\frac{\\frac{-h}{x(x+h)}}{h}=\\frac{-h}{h\\cdot x(x+h)}=\\frac{-1}{x(x+h)}$', why: '分子分母的 $h$ 约掉（$h\\neq0$）。' },
                  { action: '取极限', latex: '$f\'(x)=\\lim_{h\\to0}\\frac{-1}{x(x+h)}=\\frac{-1}{x\\cdot x}=-\\frac{1}{x^2}$', why: '$h\\to0$ 时 $x+h\\to x$。' },
                ],
                result: '$f\'(x)=-\\dfrac{1}{x^2}$（$x\\neq0$）。',
                check: '在 $x=2$ 处导数为 $-\\frac14$，函数 $1/x$ 在该点是下降的，负号合理 ✓。',
                pitfall: '通分时分子是 $x-(x+h)$，顺序不能写反，否则符号会错。',
              },
            ],
            mistakes: [
              { title: '别把 $h$ 直接当成 0', text: '差商里分母有 $h$，所以 $h$ 只能趋近 0、不能等于 0。约分之后再让 $h\\to0$，顺序不能颠倒。' },
              { title: '导数是「瞬时」不是「平均」', text: '差商是平均变化率，导数才是取极限后的瞬时变化率。写定义时别忘了外面的 $\\lim$。' },
            ],
            summary: [
              { text: '导数是差商 $\\dfrac{f(x+h)-f(x)}{h}$ 在 $h\\to0$ 时的极限。它衡量「某一瞬间变化得多快」。用定义求导的四步是：**代入 $f(x+h)$ → 相减 → 除以 $h$ 并约分 → 取极限**。后面所有快捷法则，源头都在这个定义。' },
            ],
          },
        },
        {
          id: 'p4c1t2',
          title: '导数与切线、变化率',
          objective: '能解释导数是切线斜率与瞬时变化率，会求曲线在一点的切线方程',
          minutes: 20,
          blocks: {
            background: [
              {
                title: '一根贴上去的直尺',
                text: '把直尺靠在曲线上某一点，慢慢转动，总有一个位置「最贴合」曲线的走向。这条直线叫切线。它的斜率怎么算？答案正是导数。',
              },
            ],
            plain: [
              {
                text: '先连两点得到**割线**，它穿过曲线；让其中一点沿着曲线滑向另一点，割线就慢慢转到**切线**的位置。割线斜率是差商，切线斜率是差商的极限，也就是导数。同一件事换到物理里：位移对时间的导数是瞬时速度，速度对时间的导数是瞬时加速度。',
              },
            ],
            definition: [
              {
                title: '切线与切线方程',
                text: '曲线 $y=f(x)$ 在点 $(a,f(a))$ 处的切线，是割线当另一点趋近于它时的极限位置；其斜率为 $f\'(a)$。于是切线方程用点斜式写成 $$y-f(a)=f\'(a)(x-a)$$ 这里 $f\'(a)$ 必须存在（切线不能是竖直的）。',
              },
            ],
            symbols: [
              {
                text: '$f\'(a)$ 是切线的**斜率**，$a$ 是切点的横坐标，$(a,f(a))$ 是切点。$\\dfrac{dy}{dx}$ 是导数的另一种记号，莱布尼茨发明的，它把「$y$ 的变化除以 $x$ 的变化」这层意思写在脸上。',
              },
            ],
            figure: {
              kind: 'derivative',
              initialFn: 'x^2',
              caption: '观察割线转动成切线的过程：当两个点重合时，割线斜率 $f\'(a)$ 就是切线斜率。切线在该点与曲线方向一致。',
            },
            keyFormulas: [
              { latex: 'y-f(a)=f\'(a)(x-a)', meaning: '曲线在 $x=a$ 处的切线方程（点斜式）', note: '要求 $f\'(a)$ 存在', display: 'block' },
              { latex: 'v(t)=s\'(t),\\quad a(t)=v\'(t)=s\'\'(t)', meaning: '位移的导数是速度，速度的导数是加速度' },
              { latex: '\\left.\\frac{dy}{dx}\\right|_{x=a}=f\'(a)', meaning: '导数记号，$x=a$ 处的导数值' },
            ],
            examplesBasic: [
              {
                title: '求抛物线在一点的切线',
                level: 'basic',
                asking: '求曲线 $y=x^2$ 在点 $(1,1)$ 处的切线方程。',
                given: ['$y=x^2$，切点 $(1,1)$', '已知 $f\'(x)=2x$'],
                method: ['切点处导数即切线斜率', '点斜式直线方程'],
                steps: [
                  { action: '求切线斜率', latex: '$k=f\'(1)=2\\times1=2$', why: '导数值就是该点切线斜率。' },
                  { action: '确认切点在曲线上', latex: '$1^2=1$，点 $(1,1)$ 确实在曲线上', why: '点斜式需要一个在直线上的已知点。' },
                  { action: '代入点斜式', latex: '$y-1=2(x-1)$', why: '用 $y-f(a)=f\'(a)(x-a)$，$a=1$，$f(a)=1$。' },
                  { action: '整理成斜截式', latex: '$y=2x-2+1=2x-1$', why: '展开并合并常数项。' },
                ],
                result: '切线方程为 $y=2x-1$。',
                check: '代 $x=1$ 得 $y=1$，切线经过切点 ✓；斜率 2 与 $f\'(1)=2$ 一致 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '求反比例曲线的切线',
                level: 'advanced',
                asking: '求曲线 $y=\\dfrac{1}{x}$ 在点 $\\left(2,\\dfrac12\\right)$ 处的切线方程。',
                given: ['$y=\\dfrac{1}{x}$，切点 $\\left(2,\\dfrac12\\right)$', '已知 $f\'(x)=-\\dfrac{1}{x^2}$'],
                method: ['导数给斜率', '点斜式'],
                steps: [
                  { action: '求切线斜率', latex: '$k=f\'(2)=-\\frac{1}{2^2}=-\\frac14$', why: '把 $x=2$ 代入导函数。' },
                  { action: '代入点斜式', latex: '$y-\\frac12=-\\frac14(x-2)$', why: '$f(2)=\\frac12$，$f\'(2)=-\\frac14$。' },
                  { action: '展开整理', latex: '$y=-\\frac14x+\\frac12+\\frac12=-\\frac14x+1$', why: '$-\\frac14(x-2)=-\\frac14x+\\frac12$，再加左边的 $\\frac12$。' },
                ],
                result: '切线方程为 $y=-\\dfrac{x}{4}+1$。',
                check: '代 $x=2$：$y=-\\frac12+1=\\frac12$，过切点 ✓；斜率为负，与 $1/x$ 在该点递减相符 ✓。',
              },
            ],
            application: [
              {
                title: '导数就是「仪表盘」',
                text: '汽车速度表显示的是瞬时速度 $s\'(t)$，它来自位移的导数；推背感的强弱对应加速度 $s\'(t)$ 的变化，也就是 $s\'\'(t)$。工程师设计电梯、过山车时，都要控制加速度别太大，靠的正是这套导数语言。',
              },
            ],
            mistakes: [
              { title: '点斜式的点要代对', text: '公式 $y-f(a)=f\'(a)(x-a)$ 里，纵坐标用 $f(a)$，横坐标用 $a$。常见错误是把 $a$ 代到 $y$ 的位置。' },
              { title: '竖直切线求不出来', text: '如果某点导数不存在（比如 $y=\\sqrt[3]{x}$ 在原点的竖直切线），点斜式就失效，这属于导数不存在的情况，下一节会细说。' },
            ],
            summary: [
              { text: '导数的几何意义是**切线斜率**，物理意义是**瞬时变化率**。会求导之后，求切线只要两步：代入得斜率 $f\'(a)$，再套点斜式 $y-f(a)=f\'(a)(x-a)$。位移、速度、加速度是这条链子最直观的例子。' },
            ],
          },
        },
        {
          id: 'p4c1t3',
          title: '左导数、右导数、可导性与连续性',
          objective: '能计算左右导数，说明可导与连续的关系，判断尖角处是否可导',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '尖角处有切线吗',
                text: '$y=|x|$ 的图像在原点是个尖角。从左边看斜率是 $-1$，从右边看是 $+1$。两条「切线」方向不一样，到底听谁的？这就需要左导数和右导数来把话说清楚。',
              },
            ],
            plain: [
              {
                text: '把函数图像想成一条路。你从左边走到某点和从右边走到某点，脚下的坡度可能不同：左边是下坡、右边是上坡，交汇处就是尖角。只有当两侧的坡度**相同**时，这个点才有统一的切线，函数在那里才可导。',
              },
              {
                text: '还有一件容易被搞混的事：路没断（连续），并不代表路光滑（可导）。反过来，只要路光滑到能求导，它就一定没断。这个方向性是必考的理解点。',
              },
            ],
            definition: [
              {
                title: '左导数与右导数',
                text: '$$f\'_-(a)=\\lim_{h\\to0^-}\\frac{f(a+h)-f(a)}{h},\\qquad f\'_+(a)=\\lim_{h\\to0^+}\\frac{f(a+h)-f(a)}{h}$$ 前者只让 $h$ 从负数一边趋近 0，后者只让 $h$ 从正数一边趋近 0。$f$ 在 $a$ 处**可导**，当且仅当 $f\'_-(a)$ 与 $f\'_+(a)$ 都存在并且相等，这个公共值就是 $f\'(a)$。',
              },
              {
                title: '可导性与连续性',
                text: '若 $f$ 在 $a$ 处可导，则 $f$ 在 $a$ 处一定连续；但 $f$ 在 $a$ 处连续，未必可导。典型反例是 $f(x)=|x|$：它在 $x=0$ 连续，却不可导。',
              },
            ],
            symbols: [
              {
                text: '$h\\to0^-$ 表示 $h$ 从小于 0 的一侧靠近 0（从左走），$h\\to0^+$ 表示从大于 0 的一侧靠近 0（从右走）。$f\'_-(a)$、$f\'_+(a)$ 分别读作「左导数」「右导数」。',
              },
            ],
            keyFormulas: [
              { latex: 'f\'(a)\\ \\text{存在}\\iff f\'_-(a)=f\'_+(a)', meaning: '可导的充要条件：左右导数存在且相等', display: 'block' },
              { latex: 'f\'(a)\\ \\text{存在}\\Rightarrow f\\ \\text{在}\\ a\\ \\text{连续}', meaning: '可导必连续' },
              { latex: 'f\\ \\text{连续}\\nRightarrow f\\ \\text{可导}', meaning: '连续推不出可导，反例 $|x|$ 在 0 处' },
            ],
            examplesBasic: [
              {
                title: '讨论 $|x|$ 在原点的可导性',
                level: 'basic',
                asking: '判断 $f(x)=|x|$ 在 $x=0$ 处是否连续、是否可导。',
                given: ['$f(x)=|x|$', '$f(0)=0$'],
                method: ['左右导数定义', '$\\dfrac{|h|}{h}$ 在 $h$ 正负时的取值'],
                steps: [
                  { action: '先检查连续性', latex: '$\\lim_{h\\to0}|h|=0=f(0)$', why: '左右极限都等于函数值 0，所以连续。' },
                  { action: '算右导数', latex: '$f\'_+(0)=\\lim_{h\\to0^+}\\frac{|h|-0}{h}=\\lim_{h\\to0^+}\\frac{h}{h}=1$', why: '$h>0$ 时 $|h|=h$，约分得 1。' },
                  { action: '算左导数', latex: '$f\'_-(0)=\\lim_{h\\to0^-}\\frac{|h|-0}{h}=\\lim_{h\\to0^-}\\frac{-h}{h}=-1$', why: '$h<0$ 时 $|h|=-h$，约分得 $-1$。' },
                  { action: '比较左右导数', latex: '$f\'_-(0)=-1\\neq1=f\'_+(0)$', why: '左右导数不相等，所以导数不存在。' },
                ],
                result: '$f(x)=|x|$ 在 $x=0$ 处连续但不可导（那里是尖角）。',
                check: '图像在原点左侧斜率 $-1$、右侧斜率 $+1$，尖角处没有统一切线 ✓。',
                pitfall: '别因为「连续」就推断「可导」。尖角、竖直切线、跳跃都是不可导的常见来源。',
              },
            ],
            examplesAdvanced: [
              {
                title: '分段函数在接缝处的可导性',
                level: 'advanced',
                asking: '设 $f(x)=\\begin{cases}x^2,&x\\le1\\\\2x-1,&x>1\\end{cases}$，判断它在 $x=1$ 处是否可导。',
                given: ['分段函数 $f(x)$', '分段点 $x=1$，$f(1)=1^2=1$'],
                method: ['用导数定义分别算左右导数', '连续是可导的前提'],
                steps: [
                  { action: '检查连续性', latex: '$\\lim_{x\\to1^+}(2x-1)=1=f(1)$', why: '右侧极限等于函数值，接缝没断。' },
                  { action: '算左导数', latex: '$f\'_-(1)=\\lim_{h\\to0^-}\\frac{(1+h)^2-1}{h}=\\lim_{h\\to0^-}\\frac{2h+h^2}{h}=2$', why: '$h<0$ 用左侧表达式 $x^2$，展开后约掉 $h$。' },
                  { action: '算右导数', latex: '$f\'_+(1)=\\lim_{h\\to0^+}\\frac{[2(1+h)-1]-1}{h}=\\lim_{h\\to0^+}\\frac{2h}{h}=2$', why: '$h>0$ 用右侧表达式 $2x-1$。' },
                  { action: '比较并下结论', latex: '$f\'_-(1)=f\'_+(1)=2\\Rightarrow f\'(1)=2$', why: '左右导数相等且函数连续，故在 $x=1$ 可导。' },
                ],
                result: '$f$ 在 $x=1$ 处可导，且 $f\'(1)=2$。',
                check: '左段导数 $2x$ 在 $x=1$ 为 2，右段导数恒为 2，两侧吻合 ✓。',
                pitfall: '分段点必须用定义分别算左右导数，不能直接分别对两段求导再「看一眼」。',
              },
            ],
            mistakes: [
              { title: '连续 ≠ 可导', text: '可导是更强的条件：它要求图像光滑、没有尖角。$|x|$ 在原点连续但有尖角，所以不可导。' },
              { title: '左右导数都要算', text: '遇到分段点、绝对值、根号，务必分别算 $f\'_-$ 和 $f\'_+$，相等才可导。只算一边容易漏掉尖角。' },
            ],
            summary: [
              { text: '左右导数分别从两侧逼近，相等才有导数。重要结论只有一句：**可导必连续，连续未必可导**。绝对值在原点的尖角、分段函数的接缝，是判断可导性的经典场景。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第二章 基本求导法则 ============================ */
    {
      id: 'p4c2',
      number: 2,
      title: '基本求导法则',
      intro:
        '每次都从差商极限算起太慢了。这一章我们造一套「快捷工具」：常数、幂函数、常数倍、加减、乘积、商。复杂的函数无非是这些零件的拼装，熟练之后求导会像拼乐高一样顺手。',
      outcomes: [
        '掌握常数函数与幂函数的求导公式',
        '会用常数倍法则与加减法则逐项求导',
        '会用乘积法则与商法则求导',
        '能识别该用哪条法则，并避免常见记忆错误',
      ],
      topics: [
        {
          id: 'p4c2t1',
          title: '常数函数与幂函数求导',
          objective: '掌握幂函数求导公式，能处理负指数与分数指数的幂函数',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '从「每次都算极限」到「背公式」',
                text: '第一章用定义求 $x^2$ 的导数折腾了四步。数学家早把这四步对一般情形做完了，结论就是幂法则。有了它，$x^{100}$ 的导数一秒就能写出来。',
              },
            ],
            plain: [
              {
                text: '常数函数的图像是一条水平直线，坡度处处为 0，所以导数是 0。幂函数 $x^n$ 的求导口诀是：**指数下来当系数，指数再减一**。比如 $x^3$ 的导数是 $3x^2$。这个口诀对负指数、分数指数也成立。',
              },
            ],
            derivation: {
              intro: '对正整数 $n$，用二项式展开就能看懂幂法则的来历：',
              steps: [
                { action: '写出增量', latex: '$(x+h)^n=x^n+nx^{n-1}h+\\binom{n}{2}x^{n-2}h^2+\\cdots+h^n$', why: '二项式定理展开，第一项是 $x^n$，第二项是 $nx^{n-1}h$，其余项都含 $h^2$ 或更高次。' },
                { action: '算差商', latex: '$\\frac{(x+h)^n-x^n}{h}=nx^{n-1}+\\binom{n}{2}x^{n-2}h+\\cdots+h^{n-1}$', why: '减去 $x^n$ 再除以 $h$，第二项变成 $nx^{n-1}$，其余项仍含 $h$。' },
                { action: '取极限', latex: '$f\'(x)=\\lim_{h\\to0}\\left[nx^{n-1}+\\binom{n}{2}x^{n-2}h+\\cdots\\right]=nx^{n-1}$', why: '所有含 $h$ 的项都趋于 0，只剩第一项。' },
              ],
              conclusion: '这就得到 $(x^n)\'=nx^{n-1}$。可以证明它对任意实数指数 $n$ 都成立。',
            },
            definition: [
              {
                text: '**幂法则**：对任意实数 $n$，$\\dfrac{d}{dx}\\left(x^n\\right)=nx^{n-1}$（在定义域内）。**常数法则**：$\\dfrac{d}{dx}(c)=0$。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{d}{dx}(c)=0', meaning: '常数的导数是 0', note: '$c$ 是不随 $x$ 变化的数' },
              { latex: '\\frac{d}{dx}\\left(x^n\\right)=nx^{n-1}', meaning: '幂法则：指数下来当系数，指数减一', note: '对任意实数 $n$ 成立，要求底数就是自变量 $x$', display: 'block' },
              { latex: '\\sqrt{x}=x^{1/2},\\quad \\frac{1}{x^k}=x^{-k}', meaning: '根式和分式先改写成幂函数再求导' },
            ],
            figure: {
              kind: 'derivative',
              initialFn: 'x^3',
              caption: '拖动 $x$，比较 $y=x^3$ 的切线斜率与 $3x^2$ 的值，验证幂法则。',
            },
            examplesBasic: [
              {
                title: '直接套幂法则',
                level: 'basic',
                asking: '求 $f(x)=x^5$、$g(x)=x$、$h(x)=\\sqrt{x}$ 的导数。',
                given: ['$f(x)=x^5$', '$g(x)=x=x^1$', '$h(x)=\\sqrt{x}=x^{1/2}$'],
                method: ['幂法则 $(x^n)\'=nx^{n-1}$', '先改写成幂函数'],
                steps: [
                  { action: '求 $f\'(x)$', latex: '$f\'(x)=5x^{5-1}=5x^4$', why: '指数 5 下来当系数，指数减 1 得 4。' },
                  { action: '求 $g\'(x)$', latex: '$g\'(x)=1\\cdot x^{1-1}=1\\cdot x^0=1$', why: '$x^0=1$，所以直线 $y=x$ 的斜率恒为 1。' },
                  { action: '求 $h\'(x)$', latex: '$h\'(x)=\\frac12x^{1/2-1}=\\frac12x^{-1/2}=\\frac{1}{2\\sqrt{x}}$', why: '先把根号写成 $x^{1/2}$，再套幂法则；结果要求 $x>0$。' },
                ],
                result: '$f\'(x)=5x^4$，$g\'(x)=1$，$h\'(x)=\\dfrac{1}{2\\sqrt{x}}$。',
                check: '$y=\\sqrt{x}$ 越往右越平缓，导数 $\\frac{1}{2\\sqrt{x}}$ 随 $x$ 增大而减小，符合 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '负指数幂的求导',
                level: 'advanced',
                asking: '求 $f(x)=\\dfrac{1}{x^3}$ 的导数。',
                given: ['$f(x)=\\dfrac{1}{x^3}$'],
                method: ['先写成负指数幂 $x^{-3}$', '再用幂法则'],
                steps: [
                  { action: '改写成幂函数', latex: '$f(x)=\\frac{1}{x^3}=x^{-3}$', why: '幂法则要求底数是 $x$，分形式子先写成负指数。' },
                  { action: '套用幂法则', latex: '$f\'(x)=-3x^{-3-1}=-3x^{-4}$', why: '指数 $-3$ 下来当系数，指数再减 1 得 $-4$。' },
                  { action: '写回分式', latex: '$-3x^{-4}=-\\frac{3}{x^4}$', why: '负指数表示倒数，按要求整理形式。' },
                ],
                result: '$f\'(x)=-\\dfrac{3}{x^4}$（$x\\neq0$）。',
                check: '$1/x^3$ 在 $x>0$ 时递减，导数为负 ✓；与第一章用定义求 $1/x$ 得 $-1/x^2$ 的思路一致 ✓。',
                pitfall: '常见错误是直接对 $\\frac{1}{x^3}$「分母求导」，那没有法则依据。必须先改写成 $x^{-3}$。',
              },
            ],
            mistakes: [
              { title: '幂法则的底数必须是 $x$', text: '$(x^n)\'=nx^{n-1}$ 只对底数为自变量本身成立。$(\\sin x)^n$、$(2x)^n$ 这类要用第三章的链式法则，不能生搬。' },
              { title: '根号和分式先改写', text: '$\\sqrt{x}$、$\\frac{1}{x^2}$ 这类先写成 $x^{1/2}$、$x^{-2}$，再套公式，出错率会大幅下降。' },
            ],
            summary: [
              { text: '两条最基本的公式：$c\'=0$，$(x^n)\'=nx^{n-1}$。幂法则对任意实数指数都成立，所以根式、分式先改写成 $x^n$ 的形式，求导就变成机械操作。' },
            ],
          },
        },
        {
          id: 'p4c2t2',
          title: '常数倍法则与加减法则',
          objective: '会用常数倍法则与加减法则对多项式和根式组合逐项求导',
          minutes: 15,
          blocks: {
            background: [
              {
                text: '像 $3x^4-2x^2+7$ 这样的多项式怎么求导？好消息是：求导这项操作可以「拆开做」——每一项单独求，常数可以提到外面。',
              },
            ],
            plain: [
              {
                text: '把求导想成拆快递：一箱里有多件包裹，一件件拆就行。常数倍可以「先放着不管」，最后乘回去；加减号两边各求各的。这两条法则合起来，叫做导数的**线性性**。',
              },
            ],
            definition: [
              {
                text: '若 $f,g$ 都可导，$c$ 为常数，则 $(cf)\'=c\\,f\'$，$(f\\pm g)\'=f\'\pm g\'$。用莱布尼茨记号写就是 $\\dfrac{d}{dx}(cf)=c\\dfrac{df}{dx}$，$\\dfrac{d}{dx}(f\\pm g)=\\dfrac{df}{dx}\\pm\\dfrac{dg}{dx}$。',
              },
            ],
            derivation: {
              intro: '这两条法则直接来自极限的加减法与数乘性质：',
              steps: [
                { action: '常数倍', latex: '$\\lim_{h\\to0}\\frac{cf(x+h)-cf(x)}{h}=c\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}=cf\'(x)$', why: '常数 $c$ 可以提到极限符号外面。' },
                { action: '加减', latex: '$\\lim_{h\\to0}\\frac{[f+g](x+h)-[f+g](x)}{h}=f\'(x)+g\'(x)$', why: '极限的和等于和的极限（前提是两者极限都存在）。' },
              ],
              conclusion: '所以求导可以逐项进行：先拆成简单项，分别求导，再按原来的加减号拼回去。',
            },
            keyFormulas: [
              { latex: '(cf)\'=c\\,f\'', meaning: '常数可以提出来，求导后乘回去' },
              { latex: '(f\\pm g)\'=f\'\pm g\'', meaning: '逐项求导，符号保持不变', display: 'block' },
            ],
            examplesBasic: [
              {
                title: '多项式逐项求导',
                level: 'basic',
                asking: '求 $f(x)=3x^4-2x^2+7$ 的导数。',
                given: ['$f(x)=3x^4-2x^2+7$'],
                method: ['加减法则逐项求导', '常数倍法则', '幂法则与常数法则'],
                steps: [
                  { action: '对 $3x^4$ 求导', latex: '$(3x^4)\'=3\\cdot4x^{3}=12x^3$', why: '常数 3 保留，幂法则给 $4x^3$。' },
                  { action: '对 $-2x^2$ 求导', latex: '$(-2x^2)\'=-2\\cdot2x^{1}=-4x$', why: '负号跟着系数 $-2$ 一起，幂法则给 $2x$。' },
                  { action: '对常数 7 求导', latex: '$7\'=0$', why: '常数函数斜率为 0。' },
                  { action: '拼回结果', latex: '$f\'(x)=12x^3-4x+0=12x^3-4x$', why: '按原符号把三项结果相加。' },
                ],
                result: '$f\'(x)=12x^3-4x$。',
                check: '代 $x=1$：$f\'(1)=8$。用差商 $\\frac{f(1.001)-f(1)}{0.001}$ 数值接近 8 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '根式与分式的组合',
                level: 'advanced',
                asking: '求 $f(x)=2\\sqrt{x}-\\dfrac{5}{x}+3$ 的导数。',
                given: ['$f(x)=2\\sqrt{x}-\\dfrac{5}{x}+3$'],
                method: ['先全部改写成幂函数', '逐项求导'],
                steps: [
                  { action: '统一改写成幂函数', latex: '$f(x)=2x^{1/2}-5x^{-1}+3$', why: '$\\sqrt{x}=x^{1/2}$，$\\frac{1}{x}=x^{-1}$，这样才能用幂法则。' },
                  { action: '求第一项导数', latex: '$(2x^{1/2})\'=2\\cdot\\frac12x^{-1/2}=x^{-1/2}$', why: '$2$ 与 $\\frac12$ 相乘得 1。' },
                  { action: '求第二项导数', latex: '$(-5x^{-1})\'=-5\\cdot(-1)x^{-2}=5x^{-2}$', why: '指数 $-1$ 乘系数 $-5$ 得 $+5$，指数减一得 $-2$。' },
                  { action: '常数项与合并', latex: '$f\'(x)=x^{-1/2}+5x^{-2}=\\frac{1}{\\sqrt{x}}+\\frac{5}{x^2}$', why: '$3\'=0$，再把负指数写回分式（$x>0$）。' },
                ],
                result: '$f\'(x)=\\dfrac{1}{\\sqrt{x}}+\\dfrac{5}{x^2}$（$x>0$）。',
                check: '$x^{-1}$ 项导数为正，说明 $-5/x$ 随 $x$ 增大而上升，符合图像 ✓。',
                pitfall: '$-5x^{-1}$ 求导时出现「负负得正」，是很常见的符号陷阱，务必把系数和指数的负号都算进去。',
              },
            ],
            mistakes: [
              { title: '常数项别弄丢', text: '$f(x)=x^2+7$ 的导数是 $2x$，那个 7 求导后变成 0。但 $7x$ 求导是 7，别把「常数项」和「常数倍」搞混。' },
              { title: '先改写再求导', text: '遇到根号或分式，先化成 $x^n$ 的形式再逐项求导，直接对 $\\frac{1}{x}$ 下手容易出错。' },
            ],
            summary: [
              { text: '常数倍与加减法则说明求导是「线性操作」：$(cf\\pm dg)\'=cf\'\\pm dg\'$。复杂函数先拆成简单项（根式、分式改写成幂函数），逐项求导后再拼回去。' },
            ],
          },
        },
        {
          id: 'p4c2t3',
          title: '乘积法则与商法则',
          objective: '会用乘积法则与商法则求导，并区分两者与链式法则的使用场景',
          minutes: 24,
          blocks: {
            background: [
              {
                text: '两个函数相乘，比如 $(x^2+1)(3x-4)$，导数等于「各自导数的乘积」吗？试一下就知道不对。相乘、相除各有专门的法则，这一节把它们一次讲清。',
              },
            ],
            plain: [
              {
                text: '乘积法则像两个人抬轿子：**第一个人出一次力、第二个人歇着，然后换过来**，最后把两种情况加起来——$(fg)\'=f\'g+fg\'$。商法则的记忆口诀是「**上导下不导，减上不导下导，最后除以底的平方**」。',
              },
            ],
            definition: [
              {
                title: '乘积法则与商法则',
                text: '若 $f,g$ 都可导，则 $$(fg)\'=f\'g+fg\'$$ 若还有 $g(x)\\neq0$，则 $$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'g-fg\'}{g^2}$$ 也可用莱布尼茨形式：$\\dfrac{d(uv)}{dx}=v\\dfrac{du}{dx}+u\\dfrac{dv}{dx}$。',
              },
            ],
            derivation: {
              intro: '乘积法则的关键，是在差商里「加一项再减一项」：',
              steps: [
                { action: '写出乘积的差商', latex: '$\\frac{f(x+h)g(x+h)-f(x)g(x)}{h}$', why: '从定义出发。' },
                { action: '中间加一项再减一项', latex: '分子 $=f(x+h)g(x+h)-f(x)g(x+h)+f(x)g(x+h)-f(x)g(x)$', why: '插入 $-f(x)g(x+h)+f(x)g(x+h)$，整体不变，却凑出了可约的结构。' },
                { action: '分组取极限', latex: '$=\\frac{[f(x+h)-f(x)]g(x+h)}{h}+\\frac{f(x)[g(x+h)-g(x)]}{h}\\to f\'(x)g(x)+f(x)g\'(x)$', why: '$h\\to0$ 时 $g(x+h)\\to g(x)$，两个差商分别趋于 $f\'$、$g\'$。' },
              ],
              conclusion: '这就是 $(fg)\'=f\'g+fg\'$。商法则可以由乘积法则推出（把 $\\frac{f}{g}$ 看成 $f\\cdot\\frac1g$ 再用链式法则），这里直接给出结论。',
            },
            keyFormulas: [
              { latex: '(fg)\'=f\'g+fg\'', meaning: '乘积法则：轮流求导再相加', note: '两个因子都要出现一次导数', display: 'block' },
              { latex: '\\left(\\frac{f}{g}\\right)\'=\\frac{f\'g-fg\'}{g^2}', meaning: '商法则：上导下不导减上不导下导，除以分母平方', note: '分子中间是减号；要求 $g(x)\\neq0$', display: 'block' },
            ],
            examplesBasic: [
              {
                title: '乘积法则的基本用法',
                level: 'basic',
                asking: '求 $f(x)=(x^2+1)(3x-4)$ 的导数。',
                given: ['$f(x)=(x^2+1)(3x-4)$'],
                method: ['乘积法则 $(fg)\'=f\'g+fg\'$', '幂法则'],
                steps: [
                  { action: '认定两个因子', latex: '$u=x^2+1,\\quad v=3x-4$', why: '把乘积拆成 $u$ 和 $v$ 两部分。' },
                  { action: '分别求导', latex: '$u\'=2x,\\quad v\'=3$', why: '逐项用幂法则。' },
                  { action: '套乘积法则', latex: '$f\'=u\'v+uv\'=2x(3x-4)+(x^2+1)\\cdot3$', why: '轮流求导：先 $u\'$ 乘 $v$，再加 $u$ 乘 $v\'$。' },
                  { action: '展开合并', latex: '$=6x^2-8x+3x^2+3=9x^2-8x+3$', why: '展开后合并同类项。' },
                ],
                result: '$f\'(x)=9x^2-8x+3$。',
                check: '先展开原式 $(x^2+1)(3x-4)=3x^3-4x^2+3x-4$，求导得 $9x^2-8x+3$，一致 ✓。',
                pitfall: '别写成 $u\'v\'$（分别求导再相乘），那是错的。乘积法则是**相加**。',
              },
            ],
            examplesAdvanced: [
              {
                title: '商法则的完整计算',
                level: 'advanced',
                asking: '求 $f(x)=\\dfrac{2x+1}{x^2+3}$ 的导数。',
                given: ['$f(x)=\\dfrac{2x+1}{x^2+3}$'],
                method: ['商法则 $\\left(\\frac fg\\right)\'=\\frac{f\'g-fg\'}{g^2}$', '分母 $x^2+3>0$ 恒不为 0'],
                steps: [
                  { action: '认定分子分母', latex: '$u=2x+1,\\quad v=x^2+3$', why: '商法则要对分子分母分别求导。' },
                  { action: '分别求导', latex: '$u\'=2,\\quad v\'=2x$', why: '幂法则与常数倍法则。' },
                  { action: '套商法则', latex: '$f\'=\\frac{u\'v-uv\'}{v^2}=\\frac{2(x^2+3)-(2x+1)(2x)}{(x^2+3)^2}$', why: '上导下不导，减去上不导下导；分母平方。' },
                  { action: '展开分子', latex: '分子 $=2x^2+6-(4x^2+2x)=2x^2+6-4x^2-2x=-2x^2-2x+6$', why: '先算 $(2x+1)(2x)=4x^2+2x$，再去括号注意变号。' },
                  { action: '写出结果', latex: '$f\'=\\frac{-2x^2-2x+6}{(x^2+3)^2}=-\\frac{2(x^2+x-3)}{(x^2+3)^2}$', why: '整理分子，可提出公因数 $-2$。' },
                ],
                result: '$f\'(x)=\\dfrac{-2x^2-2x+6}{(x^2+3)^2}$。',
                check: '在 $x=0$ 处 $f\'(0)=\\frac{6}{9}=\\frac23>0$，函数 $f(0)=\\frac13$ 附近递增，合理 ✓。',
                pitfall: '商法则分子是**差**不是和；中间的减号一旦写成加号，答案就面目全非。分母要写成 $(x^2+3)^2$，别漏平方。',
              },
            ],
            mistakes: [
              { title: '三种法则别混用', text: '$x^2\\cdot\\sin x$ 是两个函数相乘，用**乘积法则**；$\\sin(x^2)$ 是函数套函数，用**链式法则**（第三章）。判断口诀：能「分开乘」用乘积，「套进去」用链式。' },
              { title: '三项乘积怎么办', text: '遇到 $u\\cdot v\\cdot w$，把它们看成 $(uv)\\cdot w$ 连用两次乘积法则，结果是 $u\'vw+uv\'w+uvw\'$——每项只求导一次。' },
            ],
            summary: [
              { text: '乘积法则 $(fg)\'=f\'g+fg\'$ 与商法则 $\\left(\\frac fg\\right)\'=\\frac{f\'g-fg\'}{g^2}$ 是求导的两大主力。记牢「乘积是加、商法则分子是减」，分母不要漏平方。它们与下一章的链式法则分工不同：相乘相除用前两者，层层嵌套用链式。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第三章 复合函数与链式法则 ============================ */
    {
      id: 'p4c3',
      number: 3,
      title: '复合函数与链式法则',
      intro:
        '现实里的函数常常是「套娃」：$(x^2+1)^{100}$、$e^{3x}$、$\\sin(x^2)$。把这些拆开看，每个都是简单函数，可一旦套在一起，前面学的法则就不够用了。链式法则专门解决「一层套一层」的求导，它也是求导法则里使用频率最高的一条。',
      outcomes: [
        '能识别复合函数的内层与外层',
        '会用链式法则求单层和多层复合函数的导数',
        '掌握指数、对数、三角函数的导数公式',
        '能避免漏乘内层导数等常见错误',
      ],
      topics: [
        {
          id: 'p4c3t1',
          title: '复合函数与链式法则',
          objective: '能识别复合函数的内外层，并用链式法则求导',
          minutes: 22,
          blocks: {
            background: [
              {
                title: '$100$ 次方怎么求导',
                text: '要是对 $(x^2+1)^{100}$ 硬展开，得把二项式展开出 101 项，想想就崩溃。链式法则让我们「从上往下剥」，完全不用展开。',
              },
            ],
            plain: [
              {
                text: '复合函数就像流水线：原料 $x$ 先经过第一台机器 $g$ 变成中间产品 $u=g(x)$，再送进第二台机器 $f$ 变成成品 $y=f(u)$。链式法则说：成品对原料的变化率，等于「成品对中间产品的变化率 × 中间产品对原料的变化率」——像齿轮传动，两个倍率乘起来。',
              },
            ],
            definition: [
              {
                title: '链式法则',
                text: '设 $y=f(u)$，$u=g(x)$，且 $g$ 在 $x$ 可导、$f$ 在 $u=g(x)$ 可导，则复合函数 $y=f(g(x))$ 的导数为 $$\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}=f\'(u)\\cdot g\'(x)$$ 最后要把 $u=g(x)$ 代回去，结果只含 $x$。',
              },
            ],
            symbols: [
              {
                text: '$u$ 是**中间变量**（内层函数的结果）。$\\dfrac{dy}{du}$ 是外层函数对 $u$ 求导，$\\dfrac{du}{dx}$ 是内层函数对 $x$ 求导。莱布尼茨记号里这两个「$du$」可以像分数一样约掉，剩下 $\\dfrac{dy}{dx}$，这正是口诀「链式」的由来。',
              },
            ],
            derivation: {
              intro: '为什么可以「乘起来」？用差商近似看一眼：',
              steps: [
                { action: '外层的变化', latex: '$\\frac{\\Delta y}{\\Delta u}\\approx f\'(u)$', why: '当 $\\Delta u$ 很小时，外层函数的差商接近它的导数。' },
                { action: '内层的变化', latex: '$\\frac{\\Delta u}{\\Delta x}\\approx g\'(x)$', why: '同理，内层函数的差商接近它的导数。' },
                { action: '乘起来', latex: '$\\frac{\\Delta y}{\\Delta x}=\\frac{\\Delta y}{\\Delta u}\\cdot\\frac{\\Delta u}{\\Delta x}\\approx f\'(u)g\'(x)$', why: '中间量 $\\Delta u$ 约掉；取极限后近似变成等式，就是链式法则。' },
              ],
              conclusion: '严格证明要小心 $\\Delta u=0$ 的情形，但「乘起来」这个结论对所有可导的复合函数都成立。',
            },
            keyFormulas: [
              { latex: '\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}', meaning: '链式法则：外层导数乘内层导数', note: '最后必须把中间变量 $u$ 换回 $x$', display: 'block' },
              { latex: '\\left[f(g(x))\\right]\'=f\'(g(x))\\,g\'(x)', meaning: '链式法则的函数记号版本' },
            ],
            figure: {
              kind: 'derivative',
              initialFn: '(x^2+1)^3',
              caption: '观察复合函数 $y=(x^2+1)^3$：外层是三次方，内层是 $x^2+1$。拖点比较切线斜率与链式法则算出的 $6x(x^2+1)^2$。',
            },
            examplesBasic: [
              {
                title: '链式法则基本练习',
                level: 'basic',
                asking: '求 $y=(3x+2)^5$ 的导数。',
                given: ['$y=(3x+2)^5$'],
                method: ['识别内层 $u=3x+2$、外层 $y=u^5$', '链式法则', '幂法则'],
                steps: [
                  { action: '拆分内外层', latex: '$u=3x+2,\\quad y=u^5$', why: '括号里的 $3x+2$ 是内层，外面的五次幂是外层。' },
                  { action: '外层求导', latex: '$\\frac{dy}{du}=5u^4$', why: '对 $u^5$ 用幂法则。' },
                  { action: '内层求导', latex: '$\\frac{du}{dx}=3$', why: '$3x+2$ 的导数是 3。' },
                  { action: '相乘并代回', latex: '$\\frac{dy}{dx}=5u^4\\cdot3=15u^4=15(3x+2)^4$', why: '两层导数相乘，再把 $u=3x+2$ 代回去。' },
                ],
                result: '$y\'=15(3x+2)^4$。',
                check: '若展开 $(3x+2)^5$ 再逐项求导，最高次项导数是 $5\\cdot3^5x^4=1215x^4$，而 $15(3x+2)^4$ 的最高次项也是 $15\\cdot81x^4=1215x^4$，一致 ✓。',
                pitfall: '最常犯的错是只写 $5(3x+2)^4$，漏乘内层导数 3。链式法则一定要「乘到底」。',
              },
            ],
            examplesAdvanced: [
              {
                title: '含根号的复合函数',
                level: 'advanced',
                asking: '求 $y=\\sqrt{x^2+1}$ 的导数。',
                given: ['$y=\\sqrt{x^2+1}$'],
                method: ['改写成幂函数', '链式法则', '幂法则'],
                steps: [
                  { action: '拆内外层并改写', latex: '$u=x^2+1,\\quad y=u^{1/2}$', why: '根号写成 $\\frac12$ 次幂，括号里是内层。' },
                  { action: '外层求导', latex: '$\\frac{dy}{du}=\\frac12u^{-1/2}$', why: '对 $u^{1/2}$ 用幂法则，指数减一得 $-\\frac12$。' },
                  { action: '内层求导', latex: '$\\frac{du}{dx}=2x$', why: '$x^2+1$ 的导数。' },
                  { action: '相乘并化简', latex: '$\\frac{dy}{dx}=\\frac12u^{-1/2}\\cdot2x=x\\,u^{-1/2}=\\frac{x}{\\sqrt{x^2+1}}$', why: '$\\frac12$ 与 2 约掉，再把 $u=x^2+1$ 代回。' },
                ],
                result: '$y\'=\\dfrac{x}{\\sqrt{x^2+1}}$。',
                check: '$x>0$ 时导数为正、$x<0$ 时为负，这与 $\\sqrt{x^2+1}$ 在 $x=0$ 处取最小值、两侧上升的图像一致 ✓。',
              },
            ],
            mistakes: [
              { title: '漏乘内层导数', text: '链式法则出错八成是漏了 $\\dfrac{du}{dx}$。每剥一层，都要把那一层的导数乘上去。' },
              { title: '结果里别留 $u$', text: '中间变量只是帮我们分步思考，最终答案要全部换回自变量 $x$。' },
            ],
            summary: [
              { text: '链式法则 $\\dfrac{dy}{dx}=\\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$ 用来求「套娃」函数的导数。**先认内外层 → 外层求导 → 内层求导 → 相乘并代回**。记住：剥一层乘一层，千万别漏乘。' },
            ],
          },
        },
        {
          id: 'p4c3t2',
          title: '多层复合函数求导',
          objective: '会对三层及以上的复合函数逐层求导并相乘',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '有时候「套娃」不止两层，比如 $y=\\left[(x^2+1)^5+3\\right]^4$。方法完全一样：剥一层乘一层，剥到最里面为止。',
              },
            ],
            plain: [
              {
                text: '把多层复合想成剥洋葱。最外层先求导，但「里头那一整坨」要当成临时变量原样留着；剥开一层，再对新露出的那一层求导……最后把所有层的导数乘在一起。像接力赛，每位选手跑一棒。',
              },
            ],
            definition: [
              {
                text: '若 $y=f(g(h(x)))$，则由链式法则连用两次可得 $$\\frac{dy}{dx}=f\'(g(h(x)))\\cdot g\'(h(x))\\cdot h\'(x)$$ 层数再多依此类推：每层导数的乘积，就是总导数。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{dy}{dx}=\\text{外层导数}\\times\\text{中层导数}\\times\\text{内层导数}', meaning: '多层链式：逐层求导再全部相乘', note: '每一层的导数都对「紧挨着的里面那一层」求', display: 'block' },
            ],
            examplesBasic: [
              {
                title: '三层复合函数',
                level: 'basic',
                asking: '求 $y=\\left[(x^2+1)^5+3\\right]^4$ 的导数。',
                given: ['$y=\\left[(x^2+1)^5+3\\right]^4$'],
                method: ['逐层拆分：外层四次方、中层五次方加 3、内层 $x^2+1$', '每层用链式法则'],
                steps: [
                  { action: '由外到内拆层', latex: '$v=(x^2+1)^5+3,\\quad u=x^2+1,\\quad y=v^4$', why: '先认出三层结构，免得跳层。' },
                  { action: '外层求导', latex: '$\\frac{dy}{dv}=4v^3=4\\left[(x^2+1)^5+3\\right]^3$', why: '对 $v^4$ 用幂法则，里头一整坨原样保留。' },
                  { action: '中层求导', latex: '$\\frac{dv}{du}=5u^4=5(x^2+1)^4$', why: '对 $u^5+3$ 求导，常数 3 导数为 0。' },
                  { action: '内层求导', latex: '$\\frac{du}{dx}=2x$', why: '对 $x^2+1$ 求导。' },
                  { action: '三层相乘', latex: '$\\frac{dy}{dx}=4v^3\\cdot5u^4\\cdot2x=40x(x^2+1)^4\\left[(x^2+1)^5+3\\right]^3$', why: '$4\\times5\\times2=40$，并把 $u,v$ 都换回 $x$。' },
                ],
                result: '$y\'=40x(x^2+1)^4\\left[(x^2+1)^5+3\\right]^3$。',
                check: '若把原式看成「四大层乘起来」，每层贡献的因子 $4,5,2$ 与系数 $x$ 都在结果中 ✓。',
                pitfall: '中层求导时别把里层的 $2x$ 提前乘上来，每层只管自己那一层，最后统一相乘。',
              },
            ],
            examplesAdvanced: [
              {
                title: '链式法则与商法则联用',
                level: 'advanced',
                asking: '求 $y=\\sqrt{\\dfrac{x+1}{x-1}}$（$x>1$）的导数。',
                given: ['$y=\\sqrt{\\dfrac{x+1}{x-1}}$，$x>1$'],
                method: ['外层是 $\\frac12$ 次幂用链式法则', '内层是商，用商法则'],
                steps: [
                  { action: '改写并分层', latex: '$u=\\frac{x+1}{x-1},\\quad y=u^{1/2}$', why: '根号改写成幂函数，分式整体是内层。' },
                  { action: '外层求导', latex: '$\\frac{dy}{du}=\\frac12u^{-1/2}$', why: '幂法则。' },
                  { action: '内层用商法则', latex: '$\\frac{du}{dx}=\\frac{1\\cdot(x-1)-(x+1)\\cdot1}{(x-1)^2}=\\frac{x-1-x-1}{(x-1)^2}=\\frac{-2}{(x-1)^2}$', why: '上导下不导减上不导下导，分子化简得 $-2$。' },
                  { action: '相乘', latex: '$\\frac{dy}{dx}=\\frac12u^{-1/2}\\cdot\\frac{-2}{(x-1)^2}=-u^{-1/2}\\cdot\\frac{1}{(x-1)^2}$', why: '$\\frac12$ 与 $-2$ 相乘得 $-1$。' },
                  { action: '代回并化简', latex: '$=-\\left(\\frac{x+1}{x-1}\\right)^{-1/2}\\frac{1}{(x-1)^2}=-\\frac{1}{\\sqrt{x+1}\\,(x-1)^{3/2}}$', why: '负指数把分式倒过来，$(x-1)^{1/2}/(x-1)^2=1/(x-1)^{3/2}$。' },
                ],
                result: '$y\'=-\\dfrac{1}{\\sqrt{x+1}\\,(x-1)^{3/2}}$。',
                check: '当 $x>1$ 时 $\\frac{x+1}{x-1}$ 随 $x$ 增大而减小，故 $y$ 递减、导数为负 ✓。',
                pitfall: '内层是商时必须完整用商法则，分子中间的减号别忘了；最后化简负指数时别把 $(x-1)$ 的幂次算错。',
              },
            ],
            mistakes: [
              { title: '别跳层', text: '三层函数最容易漏掉中间那一层。老老实实写 $u$、$v$，一层一层求导再相乘，比心算靠谱得多。' },
              { title: '乘积与复合的判断', text: '$\\sin x\\cdot\\cos x$ 是乘积（用乘积法则），$\\sin(\\cos x)$ 是复合（用链式法则）。看括号位置：两个函数并排是乘，一个钻进另一个里面是复合。' },
            ],
            summary: [
              { text: '多层复合函数的导数等于**每层导数的乘积**。做法是：由外到内拆层 → 每层只对紧挨着的里层求导 → 全部相乘 → 换回自变量。层数再多，这个套路不变。' },
            ],
          },
        },
        {
          id: 'p4c3t3',
          title: '指数函数与对数函数求导',
          objective: '掌握 $e^x$、$a^x$、$\\ln x$ 的导数，能处理与链式、乘积法则的混合题',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '第一篇里我们说过：$e^x$ 的导数是它自己，$\\ln x$ 的导数是 $\\frac1x$。现在来把这「漂亮得不可思议」的结论用起来，看看它们和链式法则碰在一起会怎样。',
              },
            ],
            plain: [
              {
                text: '$e^x$ 求导还是 $e^x$，像「永葆青春」；$\\ln x$ 求导变成 $\\frac1x$，意味着 $x$ 越大曲线越平。以别的数为底的指数 $a^x$ 会多出一个因子 $\\ln a$，这正是自然常数 $e$ 之所以「自然」的原因。',
              },
            ],
            derivation: {
              intro: '这些公式彼此相连。先用反函数关系推出 $\\ln x$ 的导数：',
              steps: [
                { action: '从反函数关系出发', latex: '若 $y=\\ln x$，则 $x=e^y$', why: '指数与对数互为反函数。' },
                { action: '两边对 $x$ 求导', latex: '$1=e^y\\cdot\\frac{dy}{dx}$', why: '右边把 $y$ 看作 $x$ 的函数，用链式法则。' },
                { action: '解出导数', latex: '$\\frac{dy}{dx}=\\frac{1}{e^y}=\\frac{1}{x}$', why: '把 $e^y=x$ 代回去，得 $(\\ln x)\'=\\frac1x$。' },
                { action: '反推 $e^x$ 的导数', latex: '$\\ln(e^x)=x\\Rightarrow\\frac{1}{e^x}(e^x)\'=1\\Rightarrow(e^x)\'=e^x$', why: '对 $\\ln(e^x)=x$ 两边求导，链式法则给出 $\\frac{1}{e^x}(e^x)\'=1$。' },
              ],
              conclusion: '可见 $(\\ln x)\'=\\frac1x$ 与 $(e^x)\'=e^x$ 是同一枚硬币的两面。这里轻轻用了隐函数的想法，第四章会正式介绍。',
            },
            definition: [
              {
                text: '基本公式：$(e^x)\'=e^x$；$(a^x)\'=a^x\\ln a$（$a>0,a\\neq1$）；$(\\ln x)\'=\\dfrac1x$（$x>0$）；$(\\log_a x)\'=\\dfrac{1}{x\\ln a}$。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{d}{dx}e^x=e^x', meaning: '自然指数函数的导数还是它自己', display: 'block' },
              { latex: '\\frac{d}{dx}a^x=a^x\\ln a', meaning: '一般指数函数的导数，多一个 $\\ln a$ 因子' },
              { latex: '\\frac{d}{dx}\\ln x=\\frac{1}{x}\\quad(x>0)', meaning: '自然对数的导数', note: '真数必须为正', display: 'block' },
              { latex: '\\frac{d}{dx}\\big[e^{g(x)}\\big]=e^{g(x)}\\,g\'(x)', meaning: '指数函数与链式法则的配合' },
            ],
            examplesBasic: [
              {
                title: '指数与对数的链式求导',
                level: 'basic',
                asking: '求 $f(x)=e^{3x}$ 与 $g(x)=\\ln(x^2+1)$ 的导数。',
                given: ['$f(x)=e^{3x}$', '$g(x)=\\ln(x^2+1)$'],
                method: ['$(e^x)\'=e^x$ 与链式法则', '$(\\ln x)\'=\\frac1x$ 与链式法则'],
                steps: [
                  { action: '求 $f\'(x)$：拆内外层', latex: '$u=3x,\\quad f=e^u$', why: '$3x$ 在指数位置，是内层。' },
                  { action: '套链式法则', latex: '$f\'=e^u\\cdot u\'=e^{3x}\\cdot3=3e^{3x}$', why: '外层导数仍是 $e^u$，乘内层导数 3。' },
                  { action: '求 $g\'(x)$：拆内外层', latex: '$v=x^2+1,\\quad g=\\ln v$', why: '对数的真数是内层。' },
                  { action: '套链式法则', latex: '$g\'=\\frac1v\\cdot v\'=\\frac{1}{x^2+1}\\cdot2x=\\frac{2x}{x^2+1}$', why: '$(\\ln v)\'=\\frac1v$，再乘 $v\'=2x$。' },
                ],
                result: '$f\'(x)=3e^{3x}$，$g\'(x)=\\dfrac{2x}{x^2+1}$。',
                check: '$g(x)=\\ln(x^2+1)$ 是偶函数，导数 $\\frac{2x}{x^2+1}$ 是奇函数，符合「偶函数的导数是奇函数」✓。',
                pitfall: '$\\ln(x^2+1)$ 的导数不是 $\\frac{1}{x^2+1}$，一定要乘上内层的 $2x$。',
              },
            ],
            examplesAdvanced: [
              {
                title: '乘积、链式与指数的混合',
                level: 'advanced',
                asking: '求 $f(x)=x^2e^{-x}$ 的导数。',
                given: ['$f(x)=x^2e^{-x}$'],
                method: ['乘积法则', '$e^{-x}$ 用链式法则求导'],
                steps: [
                  { action: '认定乘积的两部分', latex: '$u=x^2,\\quad v=e^{-x}$', why: '$x^2$ 与 $e^{-x}$ 相乘。' },
                  { action: '分别求导', latex: '$u\'=2x,\\qquad v\'=e^{-x}\\cdot(-1)=-e^{-x}$', why: '$v\'$ 用链式法则：外层导数 $e^{-x}$，内层 $-x$ 的导数是 $-1$。' },
                  { action: '套乘积法则', latex: '$f\'=u\'v+uv\'=2x\\,e^{-x}+x^2(-e^{-x})$', why: '轮流求导再相加。' },
                  { action: '提取公因式', latex: '$=e^{-x}(2x-x^2)=x(2-x)e^{-x}$', why: '提出公因式 $e^{-x}$，再提 $x$。' },
                ],
                result: '$f\'(x)=x(2-x)e^{-x}$。',
                check: '$f\'(2)=0$，即 $x=2$ 是临界点；$x^2e^{-x}$ 在 $x=2$ 附近由增转减，符合极值特征 ✓。',
              },
            ],
            application: [
              {
                text: '指数函数描述增长与衰变：细菌繁殖、复利、放射性衰变都满足 $\\dfrac{dN}{dt}=kN$——「变化率与当前量成正比」，其解正是指数函数。导数在这里直接翻译成「每秒增长多少」。',
              },
            ],
            ai: [
              {
                title: '为损失函数埋伏笔',
                text: '机器学习里的 softmax 用 $e^x$ 把分数变成概率，交叉熵损失用 $\\ln$ 衡量预测与真实的差距。下一章和第六章求导时，这两条公式会反复登场。',
              },
            ],
            mistakes: [
              { title: '指数函数与幂函数别混淆', text: '$2^x$ 是**指数函数**，导数是 $2^x\\ln 2$；$x^2$ 是**幂函数**，导数是 $2x$。一个指数在变，一个底数在变，公式完全不同。' },
              { title: '$\\ln$ 的真数要为正', text: '$(\\ln x)\'=\\frac1x$ 只对 $x>0$ 成立。$\\ln(x^2+1)$ 的真数恒正，所以处处可导；$\\ln x$ 本身在 $x\\le0$ 处无定义。' },
            ],
            summary: [
              { text: '记住三对公式：$(e^x)\'=e^x$、$(a^x)\'=a^x\\ln a$、$(\\ln x)\'=\\frac1x$。它们与链式法则配合时，记住「外层照公式、内层再乘一个导数」。指数函数与幂函数的区别，是这一节最容易翻车的地方。' },
            ],
          },
        },
        {
          id: 'p4c3t4',
          title: '三角函数求导',
          objective: '掌握 $\\sin x$、$\\cos x$、$\\tan x$ 的导数，会结合链式与乘积法则求导',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '钟摆、声波、交流电都是周而复始的波动，描述它们的正弦和余弦怎么求导？好消息是，导出来还是正弦余弦，只是「换班」并带个符号。',
              },
            ],
            plain: [
              {
                text: '口诀是：**正弦求导变余弦，余弦求导变负正弦，正切求导变正割的平方**。你可以记成「正弦余弦轮流值班，轮到余弦时带个负号」。这些公式成立的前提是角度用**弧度**。',
              },
            ],
            derivation: {
              intro: '只看正弦最关键的一步，用和角公式与重要极限：',
              steps: [
                { action: '写出差商', latex: '$\\frac{\\sin(x+h)-\\sin x}{h}$', why: '从导数定义出发。' },
                { action: '用和角公式展开', latex: '$\\sin(x+h)=\\sin x\\cos h+\\cos x\\sin h$', why: '$\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B$。' },
                { action: '整理差商', latex: '$\\sin x\\cdot\\frac{\\cos h-1}{h}+\\cos x\\cdot\\frac{\\sin h}{h}$', why: '把 $\\sin x$、$\\cos x$ 当作与 $h$ 无关的因子提出来。' },
                { action: '用两个重要极限', latex: '$\\lim_{h\\to0}\\frac{\\sin h}{h}=1,\\quad\\lim_{h\\to0}\\frac{\\cos h-1}{h}=0$', why: '这两个极限（弧度制下）给出结果 $\\sin x\\cdot0+\\cos x\\cdot1=\\cos x$。' },
              ],
              conclusion: '所以 $(\\sin x)\'=\\cos x$。把 $\\sin x=\\cos(\\frac\\pi2-x)$ 类似处理，可得 $(\\cos x)\'=-\\sin x$。',
            },
            definition: [
              {
                text: '基本公式（弧度制）：$(\\sin x)\'=\\cos x$，$(\\cos x)\'=-\\sin x$，$(\\tan x)\'=\\sec^2x=\\dfrac{1}{\\cos^2x}$（在 $\\cos x\\neq0$ 处）。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{d}{dx}\\sin x=\\cos x', meaning: '正弦的导数是余弦', display: 'block' },
              { latex: '\\frac{d}{dx}\\cos x=-\\sin x', meaning: '余弦的导数是负正弦', note: '这个负号最容易漏', display: 'block' },
              { latex: '\\frac{d}{dx}\\tan x=\\sec^2x=\\frac{1}{\\cos^2x}', meaning: '正切的导数是正割平方' },
            ],
            figure: {
              kind: 'derivative',
              initialFn: 'sin(x)',
              caption: '拖动 $x$，比较 $y=\\sin x$ 的切线斜率与 $\\cos x$ 的值：在原点和 $\\pi$ 附近最陡，在波峰波谷处斜率为 0。',
            },
            examplesBasic: [
              {
                title: '三角函数与乘积法则',
                level: 'basic',
                asking: '求 $y=x^2\\sin x$ 的导数。',
                given: ['$y=x^2\\sin x$'],
                method: ['乘积法则', '$(\\sin x)\'=\\cos x$'],
                steps: [
                  { action: '认定乘积两部分', latex: '$u=x^2,\\quad v=\\sin x$', why: '幂函数与三角函数相乘。' },
                  { action: '分别求导', latex: '$u\'=2x,\\quad v\'=\\cos x$', why: '幂法则与正弦导数公式。' },
                  { action: '套乘积法则', latex: '$y\'=u\'v+uv\'=2x\\sin x+x^2\\cos x$', why: '轮流求导再相加，不展开、不漏项。' },
                ],
                result: '$y\'=2x\\sin x+x^2\\cos x$。',
                check: '在 $x=0$ 处 $y\'(0)=0$，而 $y=x^2\\sin x$ 在原点确实非常平缓 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '三角函数的复合与乘积',
                level: 'advanced',
                asking: '求 $y=\\sin(2x+1)\\cos(3x)$ 的导数。',
                given: ['$y=\\sin(2x+1)\\cos(3x)$'],
                method: ['乘积法则', '链式法则分别求 $\\sin(2x+1)$、$\\cos(3x)$ 的导数'],
                steps: [
                  { action: '认定乘积两部分', latex: '$u=\\sin(2x+1),\\quad v=\\cos(3x)$', why: '先分清谁是乘积的两个因子。' },
                  { action: '求 $u\'$（链式）', latex: '$u\'=\\cos(2x+1)\\cdot(2x+1)\'=2\\cos(2x+1)$', why: '外层 $\\sin$ 求导得 $\\cos$，内层 $2x+1$ 导数是 2。' },
                  { action: '求 $v\'$（链式）', latex: '$v\'=-\\sin(3x)\\cdot(3x)\'=-3\\sin(3x)$', why: '$\\cos$ 求导带负号，再乘内层导数 3。' },
                  { action: '套乘积法则', latex: '$y\'=u\'v+uv\'=2\\cos(2x+1)\\cos(3x)+\\sin(2x+1)\\big[-3\\sin(3x)\\big]$', why: '把两部分导数代入 $u\'v+uv\'$。' },
                  { action: '整理', latex: '$=2\\cos(2x+1)\\cos(3x)-3\\sin(2x+1)\\sin(3x)$', why: '负号挪到项前。' },
                ],
                result: '$y\'=2\\cos(2x+1)\\cos(3x)-3\\sin(2x+1)\\sin(3x)$。',
                check: '两个因子都是周期函数，导数依然是正弦余弦的组合，形式合理 ✓。',
                pitfall: '$\\cos(3x)$ 求导要同时记得「负号」和「内层因子 3」，两个都漏一个就错了。',
              },
            ],
            mistakes: [
              { title: '余弦的负号', text: '$(\\cos x)\'=-\\sin x$ 的负号是最高频错误，尤其再叠加链式法则时，两处符号要分别检查。' },
              { title: '弧度制', text: '这些导数公式只在**弧度制**下成立。若用角度制，会多出一个 $\\frac{\\pi}{180}$ 因子。微积分里一律按弧度处理。' },
            ],
            summary: [
              { text: '三条公式：$(\\sin x)\'=\\cos x$、$(\\cos x)\'=-\\sin x$、$(\\tan x)\'=\\sec^2x$，都用弧度。它们和链式、乘积法则组合时，按老规矩「外层照公式、内层再乘导数，乘积轮流求导」。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第四章 高级求导 ============================ */
    {
      id: 'p4c4',
      number: 4,
      title: '高级求导',
      intro:
        '前面处理的函数都把 $y$ 明明白白写成了 $x$ 的式子。现实里更多关系是「缠在一起」的：圆的方程、反函数、用参数描述的运动。这一章把求导的本领扩展到这些情形，并学会对导数再求导。',
      outcomes: [
        '会对隐函数求导，理解链式法则在其中的作用',
        '会用反函数求导公式',
        '会求高阶导数，理解二阶导数的意义',
        '会对参数方程求导',
      ],
      topics: [
        {
          id: 'p4c4t1',
          title: '隐函数求导',
          objective: '会对等式两边同时求导，求隐函数曲线的切线斜率',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '圆的方程 $x^2+y^2=25$ 把 $x$、$y$ 缠在一起，没有单独写成 $y=f(x)$。可我们照样想知道圆上一点的切线斜率。办法是：假装 $y$ 已经是 $x$ 的函数，对等式两边一起求导。',
              },
            ],
            plain: [
              {
                text: '隐函数求导像「一边走路一边解绳子」。每遇到含 $y$ 的项，就把它当作 $x$ 的函数来对待：对 $y^2$ 求导得到 $2y\\,y\'$，那个 $y\'=\\dfrac{dy}{dx}$ 是链式法则冒出来的「附带品」。最后把 $y\'$ 解出来就行。',
              },
            ],
            definition: [
              {
                title: '显式与隐式',
                text: '$y=x^2+1$ 是**显式**的（$y$ 被单独解出来）；$x^2+y^2=25$ 是**隐式**的（$y$ 藏在等式里）。隐函数求导的步骤是：① 把 $y$ 看作 $x$ 的函数；② 对等式两边关于 $x$ 求导（遇到 $y$ 的项就乘上 $y\'$）；③ 解出 $y\'$。',
              },
            ],
            derivation: {
              intro: '为什么对 $y^2$ 求导会多出一个 $y\'$？',
              steps: [
                { action: '把 $y$ 看成 $x$ 的函数', latex: '$y=y(x)$', why: '虽然没解出来，但曲线上 $y$ 确实随 $x$ 变化。' },
                { action: '对外层求导', latex: '$\\frac{d}{dy}(y^2)=2y$', why: '先把 $y$ 当成整体，用幂法则。' },
                { action: '乘内层的导数（链式）', latex: '$\\frac{d}{dx}(y^2)=2y\\cdot\\frac{dy}{dx}=2y\\,y\'$', why: '内层 $y$ 对 $x$ 的导数正是 $y\'$，这一步不能省。' },
              ],
              conclusion: '一般地，$\\dfrac{d}{dx}\\left(y^n\\right)=n\\,y^{n-1}y\'$。含 $y$ 的每一项都要这样处理。',
            },
            keyFormulas: [
              { latex: '\\frac{d}{dx}(y^n)=n\\,y^{n-1}\\,y\'', meaning: '对 $y$ 的幂求导，最后乘 $y\'$', note: '这是隐函数求导最容易漏的一步', display: 'block' },
              { latex: '\\frac{d}{dx}\\big[f(x)y\\big]=f\'(x)y+f(x)y\'', meaning: '乘积项求导时，$y\'$ 跟着乘积法则出现' },
            ],
            examplesBasic: [
              {
                title: '圆的切线斜率',
                level: 'basic',
                asking: '求圆 $x^2+y^2=25$ 在点 $(3,4)$ 处的切线斜率。',
                given: ['$x^2+y^2=25$', '点 $(3,4)$'],
                method: ['等式两边对 $x$ 隐函数求导', '代入坐标'],
                steps: [
                  { action: '两边对 $x$ 求导', latex: '$\\frac{d}{dx}(x^2)+\\frac{d}{dx}(y^2)=\\frac{d}{dx}(25)$', why: '等式两边做同样的操作，相等关系保持。' },
                  { action: '分别求导', latex: '$2x+2y\\,y\'=0$', why: '$x^2$ 导数是 $2x$；$y^2$ 用链式得 $2yy\'$；常数 25 导数为 0。' },
                  { action: '解出 $y\'$', latex: '$2y\\,y\'=-2x\\Rightarrow y\'=-\\frac{x}{y}$', why: '移项后除以 $2y$（在该点 $y\\neq0$）。' },
                  { action: '代入点 $(3,4)$', latex: '$\\left.y\'\\right|_{(3,4)}=-\\frac{3}{4}$', why: '把 $x=3$、$y=4$ 代入。' },
                ],
                result: '切线斜率为 $-\\dfrac{3}{4}$。',
                check: '半径从原点到 $(3,4)$ 的斜率是 $\\frac43$，切线与半径垂直，斜率乘积 $-\\frac34\\cdot\\frac43=-1$ ✓。',
                pitfall: '对 $y^2$ 求导只写 $2y$ 而漏掉 $y\'$，是隐函数求导的第一大错。',
              },
            ],
            examplesAdvanced: [
              {
                title: '较复杂的隐函数',
                level: 'advanced',
                asking: '已知 $x^3+y^3=6xy$，求 $y\'$。',
                given: ['$x^3+y^3=6xy$'],
                method: ['两边求导，含 $y$ 项乘 $y\'$', '乘积法则处理 $6xy$', '整理解出 $y\'$'],
                steps: [
                  { action: '两边求导', latex: '$3x^2+3y^2y\'=6\\big[y+x\\,y\'\\big]$', why: '左边 $y^3$ 用链式得 $3y^2y\'$；右边 $6xy$ 用乘积法则得 $6(y+xy\')$。' },
                  { action: '展开右边', latex: '$3x^2+3y^2y\'=6y+6x\\,y\'$', why: '把乘积法则结果展开。' },
                  { action: '含 $y\'$ 的项移到左边', latex: '$3y^2y\'-6x\\,y\'=6y-3x^2$', why: '把 $y\'$ 集中到一边，其余移到另一边。' },
                  { action: '提取 $y\'$', latex: '$y\\big[3y^2-6x\\big]=6y-3x^2$', why: '左边提出公因式 $y\'$。' },
                  { action: '解出并约分', latex: '$y\'=\\frac{6y-3x^2}{3y^2-6x}=\\frac{2y-x^2}{y^2-2x}$', why: '分子分母同除以 3（要求 $y^2-2x\\neq0$）。' },
                ],
                result: '$y\'=\\dfrac{2y-x^2}{y^2-2x}$。',
                check: '结果同时含 $x$、$y$，这是隐函数导数的常态——它描述的是曲线上每一点的斜率 ✓。',
                pitfall: '右边 $6xy$ 别忘了用乘积法则，直接写成 $6y\'$ 就大错特错。',
              },
            ],
            mistakes: [
              { title: '每一项含 $y$ 的都要乘 $y\'$', text: '$y^3$、$\\sin y$、$e^y$ 求导分别得 $3y^2y\'$、$\\cos y\\cdot y\'$、$e^y y\'$，链式法则一个都不能漏。' },
              { title: '解 $y\'$ 时别乱约分', text: '把 $y\'$ 集中到一边、提取公因式，再除以括号。不能在还没合并时就随便约掉 $y$ 或 $x$。' },
            ],
            summary: [
              { text: '隐函数求导的关键只有一句：**把 $y$ 当作 $x$ 的函数，对两边一起求导，见到 $y$ 就乘 $y\'$**，最后解出 $y\'$。它对圆的方程、复杂曲线都适用，也是下一节相关变化率的技术基础。' },
            ],
          },
        },
        {
          id: 'p4c4t2',
          title: '反函数求导',
          objective: '会用反函数求导公式，理解为何导数互为倒数',
          minutes: 16,
          blocks: {
            background: [
              {
                title: '不知道反函数长什么样，也能求导',
                text: '有的函数反函数根本写不出来，比如 $f(x)=x+e^x$。我们却仍然可以求出它反函数在某处的导数——靠的是原函数与反函数导数的倒数关系。',
              },
            ],
            plain: [
              {
                text: '原函数图像上点 $(a,b)$ 的斜率是 $m$，反函数图像是它关于直线 $y=x$ 的镜像，对应点变成 $(b,a)$，横纵坐标交换，斜率也就变成 $\\frac1m$。像去程走得快，回程同一段路用的时间就短——导数互为倒数。',
              },
            ],
            definition: [
              {
                title: '反函数求导公式',
                text: '设 $f$ 在 $a$ 处可导且 $f\'(a)\\neq0$，记 $b=f(a)$，则反函数在 $b$ 处可导，且 $$\\left(f^{-1}\\right)\'(b)=\\frac{1}{f\'(a)}$$ 换句话说：$\\dfrac{dy}{dx}$ 与 $\\dfrac{dx}{dy}$ 互为倒数。',
              },
            ],
            derivation: {
              intro: '公式从链式法则直接冒出来：',
              steps: [
                { action: '从反函数关系出发', latex: '若 $y=f(x)$，则 $x=f^{-1}(y)$', why: '反函数把输出还原成输入。' },
                { action: '两边对 $x$ 求导', latex: '$1=\\left(f^{-1}\\right)\'(y)\\cdot f\'(x)$', why: '右边是复合函数 $f^{-1}(f(x))$，用链式法则。' },
                { action: '解出', latex: '$\\left(f^{-1}\\right)\'(y)=\\frac{1}{f\'(x)}$', why: '两边除以 $f\'(x)$，要求它不为 0。' },
              ],
              conclusion: '把 $y=f(a)=b$、$x=a$ 代入，就得到 $\\left(f^{-1}\\right)\'(b)=\\frac{1}{f\'(a)}$。',
            },
            keyFormulas: [
              { latex: '\\left(f^{-1}\\right)\'(b)=\\frac{1}{f\'(a)},\\quad b=f(a)', meaning: '反函数的导数等于原函数导数的倒数', note: '要求 $f\'(a)\\neq0$', display: 'block' },
              { latex: '\\frac{dx}{dy}=\\frac{1}{dy/dx}', meaning: '莱布尼茨记号下的直观版本' },
            ],
            examplesBasic: [
              {
                title: '立方根函数的导数',
                level: 'basic',
                asking: '已知 $f(x)=x^3$，求 $\\left(f^{-1}\\right)\'(8)$。',
                given: ['$f(x)=x^3$', '$f^{-1}(y)=\\sqrt[3]{y}$'],
                method: ['先找到 $f(a)=8$ 的 $a$', '再用反函数求导公式'],
                steps: [
                  { action: '找对应的 $a$', latex: '$a^3=8\\Rightarrow a=2$，即 $f(2)=8$', why: '公式要用 $b=f(a)$ 中的 $a$。' },
                  { action: '求原函数在 $a$ 处的导数', latex: '$f\'(x)=3x^2\\Rightarrow f\'(2)=3\\cdot4=12$', why: '幂法则。' },
                  { action: '取倒数', latex: '$\\left(f^{-1}\\right)\'(8)=\\frac{1}{f\'(2)}=\\frac{1}{12}$', why: '套反函数求导公式。' },
                ],
                result: '$\\left(f^{-1}\\right)\'(8)=\\dfrac{1}{12}$。',
                check: '直接对 $\\sqrt[3]{y}=y^{1/3}$ 求导得 $\\frac13y^{-2/3}$，在 $y=8$ 处为 $\\frac13\\cdot\\frac14=\\frac1{12}$ ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '反函数写不出来也能求导',
                level: 'advanced',
                asking: '已知 $f(x)=x+e^x$，求 $\\left(f^{-1}\\right)\'(1)$。',
                given: ['$f(x)=x+e^x$'],
                method: ['解 $f(a)=1$ 找 $a$', '反函数求导公式'],
                steps: [
                  { action: '找对应的 $a$', latex: '$f(0)=0+e^0=1$，故 $a=0$', why: '试出 $x=0$ 时函数值恰为 1；不必解出整个反函数。' },
                  { action: '求原函数导数', latex: '$f\'(x)=1+e^x\\Rightarrow f\'(0)=1+1=2$', why: '$(e^x)\'=e^x$。' },
                  { action: '取倒数', latex: '$\\left(f^{-1}\\right)\'(1)=\\frac{1}{f\'(0)}=\\frac12$', why: '套公式，$f\'(0)=2\\neq0$，条件满足。' },
                ],
                result: '$\\left(f^{-1}\\right)\'(1)=\\dfrac12$。',
                check: '$f$ 严格递增（$f\'>0$），反函数存在；在 $y=1$ 处斜率 $\\frac12$ 为正，符合递增图像的镜像 ✓。',
                pitfall: '别硬去解 $y=x+e^x$ 的反函数（解不出来）；直接用公式，只需找到对应的 $a$。',
              },
            ],
            mistakes: [
              { title: '记号 $-1$ 表示反函数', text: '$f^{-1}$ 是反函数记号，$\\left(f^{-1}\\right)\'$ 是「反函数的导数」，它等于 $\\frac{1}{f\'}$，这里的 $\\frac1{f\'}$ 才是倒数。两者别混淆。' },
              { title: '要求 $f\'(a)\\neq0$', text: '若 $f\'(a)=0$，反函数在该点通常不可导（原图像处有水平切线，镜像后变成竖直切线）。' },
            ],
            summary: [
              { text: '反函数求导公式 $\\left(f^{-1}\\right)\'(b)=\\dfrac{1}{f\'(a)}$（其中 $b=f(a)$）来自链式法则。几何上是「关于 $y=x$ 镜像导致斜率取倒数」。它的威力在于：反函数写不出来时照样能求导。' },
            ],
          },
        },
        {
          id: 'p4c4t3',
          title: '高阶导数',
          objective: '会求二阶及更高阶导数，理解二阶导数表示变化快慢的变化',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '导数本身也是函数，还能再求导。位移的导数是速度，速度的导数是加速度——「导数的导数」正是加速度的数学模型。',
              },
            ],
            plain: [
              {
                text: '一阶导数 $f\'$ 告诉你图像「有多陡、往哪走」；二阶导数 $f\'\'$ 告诉你「陡峭程度本身怎么变」，也就是弯曲的方向。$f\'\'>0$ 时斜率在增大，图像凹向上；$f\'\'<0$ 时斜率在减小，图像凹向下。',
              },
            ],
            definition: [
              {
                text: '$f\'$ 的导数叫二阶导数，记作 $f\'\'$ 或 $\\dfrac{d^2y}{dx^2}$；继续求下去有三阶导数 $f\'\'\'$、$n$ 阶导数 $f^{(n)}$。注意 $n\\geq4$ 时改用上标括号的写法，避免数不清撇。',
              },
            ],
            keyFormulas: [
              { latex: 'f\'\'(x)=\\frac{d}{dx}\\left[f\'(x)\\right]=\\frac{d^2y}{dx^2}', meaning: '二阶导数是导数的导数', display: 'block' },
              { latex: 'a(t)=v\'(t)=s\'\'(t)', meaning: '加速度是速度的导数，也就是位移的二阶导数' },
              { latex: 'f^{(n)}(x)', meaning: '$n$ 阶导数的记号，$n\\geq4$ 时常用' },
            ],
            examplesBasic: [
              {
                title: '逐阶求导',
                level: 'basic',
                asking: '求 $f(x)=x^4-3x^2+2$ 的一、二、三阶导数。',
                given: ['$f(x)=x^4-3x^2+2$'],
                method: ['幂法则与加减法则逐阶求导'],
                steps: [
                  { action: '求一阶导数', latex: '$f\'(x)=4x^3-6x$', why: '$x^4$ 导数是 $4x^3$，$-3x^2$ 导数是 $-6x$，常数 2 导数为 0。' },
                  { action: '求二阶导数', latex: '$f\'\'(x)=12x^2-6$', why: '对 $f\'$ 再求导：$4x^3$ 得 $12x^2$，$-6x$ 得 $-6$。' },
                  { action: '求三阶导数', latex: '$f\'\'\'(x)=24x$', why: '对 $f\'\'$ 再求导：$12x^2$ 得 $24x$，常数 $-6$ 得 0。' },
                ],
                result: '$f\'(x)=4x^3-6x$，$f\'\'(x)=12x^2-6$，$f\'\'\'(x)=24x$。',
                check: '再求一阶：$f^{(4)}=24$，之后恒为 0，与四次多项式的性质一致 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '指数与三角混合的二阶导数',
                level: 'advanced',
                asking: '求 $f(x)=e^x\\sin x$ 的二阶导数。',
                given: ['$f(x)=e^x\\sin x$'],
                method: ['乘积法则求一阶导数', '再对结果用乘积法则求二阶导数'],
                steps: [
                  { action: '求一阶导数', latex: '$f\'=e^x\\sin x+e^x\\cos x=e^x(\\sin x+\\cos x)$', why: '乘积法则：$(e^x)\'\\sin x+e^x(\\sin x)\'=e^x\\sin x+e^x\\cos x$。' },
                  { action: '对一阶结果再求导', latex: '$f\'\'=\\big[e^x\\big]\'(\\sin x+\\cos x)+e^x\\big[\\sin x+\\cos x\\big]\'$', why: '把 $e^x$ 与 $(\\sin x+\\cos x)$ 看作两个因子，再用乘积法则。' },
                  { action: '分别求导', latex: '$=e^x(\\sin x+\\cos x)+e^x(\\cos x-\\sin x)$', why: '$(\\sin x)\'=\\cos x$，$(\\cos x)\'=-\\sin x$。' },
                  { action: '合并', latex: '$=e^x\\big(\\sin x+\\cos x+\\cos x-\\sin x\\big)=2e^x\\cos x$', why: '正弦项抵消，余弦项相加。' },
                ],
                result: '$f\'\'(x)=2e^x\\cos x$。',
                check: '在 $x=0$ 处 $f\'\'(0)=2>0$，函数 $e^x\\sin x$ 在原点附近凹向上，合理 ✓。',
              },
            ],
            application: [
              {
                text: '把小球上抛，位移 $s(t)=-4.9t^2+20t$（米）。速度 $v(t)=s\'(t)=-9.8t+20$，加速度 $a(t)=s\'\'(t)=-9.8$，正是重力加速度。二阶导数让「速度变化得多快」有了精确写法，电梯设计、汽车安全测试都离不开它。',
              },
            ],
            mistakes: [
              { title: '$f\'\'$ 不是 $(f\')^2$', text: '两个撇表示「求导两次」，不是「导数的平方」。要写平方会写成 $[f\'(x)]^2$。记号看着像，意思差很远。' },
              { title: '高阶导数先算干净', text: '求二阶导数时，先把一阶导数尽量化简（合并同类项、提公因式），再求下一次导，会省很多功夫。' },
            ],
            summary: [
              { text: '高阶导数就是对导数继续求导：$f\'\'$、$f\'\'\'$、$f^{(n)}$。二阶导数衡量「斜率的变化」，物理上对应加速度，几何上对应凹凸性。求高阶导数的诀窍是每求一次就先化简。' },
            ],
          },
        },
        {
          id: 'p4c4t4',
          title: '参数方程求导',
          objective: '会用 $\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}$ 求参数方程确定的函数的导数',
          minutes: 15,
          blocks: {
            background: [
              {
                text: '圆可以写成 $x=\\cos t,\\,y=\\sin t$，摆线、行星轨道也常这样表示。这里 $y$ 没直接写成 $x$ 的函数，但 $x$ 和 $y$ 都听参数 $t$ 指挥，借 $t$ 当中间人就能求导。',
              },
            ],
            plain: [
              {
                text: '想象两个人（$x$ 和 $y$）都按同一只钟（参数 $t$）行动。想知道 $y$ 相对 $x$ 的变化率，只要分别量出各自相对钟的速度，再一除：$\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}$。注意别把分子分母颠倒。',
              },
            ],
            definition: [
              {
                text: '若 $x=x(t)$、$y=y(t)$ 都可导，且 $\\dfrac{dx}{dt}\\neq0$，则 $$\\frac{dy}{dx}=\\frac{\\dfrac{dy}{dt}}{\\dfrac{dx}{dt}}$$ 这是链式法则的直接结果：$\\dfrac{dy}{dt}=\\dfrac{dy}{dx}\\cdot\\dfrac{dx}{dt}$，两边除以 $\\dfrac{dx}{dt}$ 即可。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}', meaning: '参数方程求导：对 $t$ 求导后再相除', note: '要求 $\\frac{dx}{dt}\\neq0$', display: 'block' },
            ],
            examplesBasic: [
              {
                title: '基本的参数方程求导',
                level: 'basic',
                asking: '设 $x=t^2,\\,y=2t+1$（$t>0$），求 $\\dfrac{dy}{dx}$ 及 $t=1$ 时的斜率。',
                given: ['$x=t^2$', '$y=2t+1$，$t>0$'],
                method: ['分别求 $x,y$ 对 $t$ 的导数', '相除得到 $\\frac{dy}{dx}$'],
                steps: [
                  { action: '求 $x$ 对 $t$ 的导数', latex: '$\\frac{dx}{dt}=2t$', why: '幂法则。' },
                  { action: '求 $y$ 对 $t$ 的导数', latex: '$\\frac{dy}{dt}=2$', why: '一次函数求导。' },
                  { action: '相除', latex: '$\\frac{dy}{dx}=\\frac{2}{2t}=\\frac{1}{t}$', why: '用参数方程求导公式。' },
                  { action: '代入 $t=1$', latex: '$\\left.\\frac{dy}{dx}\\right|_{t=1}=1$', why: '此时 $x=1$，斜率为 1。' },
                ],
                result: '$\\dfrac{dy}{dx}=\\dfrac1t$，$t=1$ 时斜率为 $1$。',
                check: '消去 $t$：$t=\\frac{y-1}{2}$，代入 $x=t^2$ 得 $x=\\frac{(y-1)^2}{4}$，即 $y=2\\sqrt{x}+1$，其导数为 $\\frac{1}{\\sqrt{x}}$；在 $x=1$ 处为 1 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '圆的参数方程',
                level: 'advanced',
                asking: '设 $x=\\cos t,\\,y=\\sin t$，求 $\\dfrac{dy}{dx}$。',
                given: ['$x=\\cos t$', '$y=\\sin t$'],
                method: ['分别求导', '相除', '用三角恒等式化简'],
                steps: [
                  { action: '分别求导', latex: '$\\frac{dx}{dt}=-\\sin t,\\qquad \\frac{dy}{dt}=\\cos t$', why: '$(\\cos t)\'=-\\sin t$，$(\\sin t)\'=\\cos t$。' },
                  { action: '相除', latex: '$\\frac{dy}{dx}=\\frac{\\cos t}{-\\sin t}=-\\frac{\\cos t}{\\sin t}=-\\cot t$', why: '参数方程求导公式。' },
                  { action: '换回 $x,y$', latex: '$-\\cot t=-\\frac{\\cos t}{\\sin t}=-\\frac{x}{y}$', why: '因为 $x=\\cos t$、$y=\\sin t$。' },
                ],
                result: '$\\dfrac{dy}{dx}=-\\dfrac{x}{y}$（$y\\neq0$）。',
                check: '这与隐函数求导 $x^2+y^2=1$ 得到的 $y\'=-\\frac{x}{y}$ 完全一致 ✓。',
                pitfall: '公式是「$y$ 对 $t$ 的导数除以 $x$ 对 $t$ 的导数」，顺序千万别颠倒。',
              },
            ],
            mistakes: [
              { title: '别把分子分母写反', text: '$\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$，记住「谁在分子就谁在分子」：$dy$ 在上，所以 $dy/dt$ 也在上。' },
              { title: '$dx/dt=0$ 要小心', text: '当 $\\frac{dx}{dt}=0$ 时公式失效，该处曲线往往有竖直切线（斜率无穷大），比如圆在 $t=0$ 的点 $(1,0)$。' },
            ],
            summary: [
              { text: '参数方程求导靠「中间人」$t$：$\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}$。它本质是链式法则的变形。圆的参数方程求导结果与隐函数求导一致，正好说明几条路通向同一个真理。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第五章 导数的实际应用 ============================ */
    {
      id: 'p4c5',
      number: 5,
      title: '导数的实际应用',
      intro:
        '前面几章在「怎么求导」，这一章问「求导有什么用」。导数的正负告诉你函数在上升还是下降，导数等于零的点是极值候选，二阶导数告诉你曲线往哪边弯。把这些拼起来，就能求最值、解决相关变化率问题，还能读懂经济学里的边际分析。',
      outcomes: [
        '能用一阶导数判断单调性与极值',
        '能用二阶导数判断凹凸性与拐点',
        '能解决简单的闭区间最值与实际应用最优化问题',
        '能处理相关变化率问题，理解速度、加速度与边际量',
      ],
      topics: [
        {
          id: 'p4c5t1',
          title: '函数单调性与极大值、极小值',
          objective: '会用一阶导数的符号判断单调性、找极值点',
          minutes: 22,
          blocks: {
            background: [
              {
                text: '看函数图像，哪里上坡哪里下坡一目了然；可如果只有解析式呢？导数的符号就是「坡度计」：导数为正往上走，为负往下走，为零时可能是山顶或山谷。',
              },
            ],
            plain: [
              {
                text: '把函数想象成一条山路。$f\'>0$ 是上坡，$f\'<0$ 是下坡，$f\'=0$ 是平坦处。山顶（局部极大）出现在「先上后下」的转折点，山谷（局部极小）出现在「先下后上」的转折点。只平坦不一定有极值——走平一段继续上坡，那只是「水平拐点」。',
              },
            ],
            definition: [
              {
                title: '单调性与临界点',
                text: '若在某区间上 $f\'>0$，则 $f$ 在该区间**单调递增**；若 $f\'<0$，则**单调递减**。满足 $f\'(c)=0$ 或 $f\'(c)$ 不存在的点 $c$ 叫**临界点**，它是极值的候选点。若 $f\'$ 在 $c$ 左侧为正、右侧为负，则 $f(c)$ 是局部极大值；左负右正则为局部极小值。',
              },
            ],
            derivation: {
              intro: '导数为何能决定增减？看差商的符号：',
              steps: [
                { action: '取区间内两点', latex: '$x_2>x_1$，差商 $\\frac{f(x_2)-f(x_1)}{x_2-x_1}$', why: '分母 $x_2-x_1>0$，所以差商符号由分子决定。' },
                { action: '联系导数', latex: '当区间很小时，差商 $\\approx f\'(x)$', why: '导数是差商的极限，符号在本地一致。' },
                { action: '得出结论', latex: '$f\'>0\\Rightarrow f(x_2)>f(x_1)$（递增）；$f\'<0\\Rightarrow f(x_2)<f(x_1)$（递减）', why: '差商为正说明函数值随 $x$ 增大而增大。' },
              ],
              conclusion: '严格结论由中值定理保证；这里先用「差商符号」建立直观。',
            },
            keyFormulas: [
              { latex: 'f\'>0\\Rightarrow f\\ \\text{递增};\\quad f\'<0\\Rightarrow f\\ \\text{递减}', meaning: '一阶导数符号决定单调性', display: 'block' },
              { latex: 'f\'(c)=0\\ \\text{或不存在}\\Rightarrow c\\ \\text{是临界点}', meaning: '临界点是极值的候选点' },
              { latex: 'f\':+\\to-\\Rightarrow\\text{极大};\\quad -\\to+\\Rightarrow\\text{极小}', meaning: '一阶导数判别法：看临界点两侧符号' },
            ],
            figure: {
              kind: 'derivative',
              initialFn: 'x^3-3*x',
              caption: '同时观察 $y=x^3-3x$ 与它的导数 $3x^2-3$：导数在 $x=\\pm1$ 处为零，符号变化对应图像的极大与极小。',
            },
            examplesBasic: [
              {
                title: '用符号表找极值',
                level: 'basic',
                asking: '求 $f(x)=x^3-3x$ 的单调区间与极值。',
                given: ['$f(x)=x^3-3x$'],
                method: ['求导找临界点', '列 $f\'$ 的符号表', '一阶导数判别法'],
                steps: [
                  { action: '求导', latex: '$f\'(x)=3x^2-3=3(x-1)(x+1)$', why: '因式分解便于判断符号。' },
                  { action: '找临界点', latex: '$f\'(x)=0\\Rightarrow x=-1,\\ x=1$', why: '两个零点把数轴分成三段。' },
                  { action: '判符号', latex: '$x<-1:f\'>0$; $-1<x<1:f\'<0$; $x>1:f\'>0$', why: '各段取一个代表值代入 $f\'$ 判断正负。' },
                  { action: '下结论', latex: '$x=-1$ 处 $f\':+\\to-$，极大；$x=1$ 处 $f\':-\\to+$，极小', why: '按一阶导数判别法。' },
                  { action: '算极值', latex: '$f(-1)=-1+3=2$; $f(1)=1-3=-2$', why: '把临界点代回原函数。' },
                ],
                result: '递增区间 $(-\\infty,-1)$、$(1,+\\infty)$；递减区间 $(-1,1)$；极大值 $f(-1)=2$，极小值 $f(1)=-2$。',
                check: '三次函数首项系数为正，左下右上，先在 $x=-1$ 爬到山顶再在 $x=1$ 落到山谷，符合 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '临界点未必是极值',
                level: 'advanced',
                asking: '求 $f(x)=x^4-4x^3$ 的极值，并说明 $x=0$ 处的情况。',
                given: ['$f(x)=x^4-4x^3$'],
                method: ['求导因式分解', '符号表', '区分极值与水平拐点'],
                steps: [
                  { action: '求导并因式分解', latex: '$f\'(x)=4x^3-12x^2=4x^2(x-3)$', why: '提出 $4x^2$，剩余 $x-3$。' },
                  { action: '找临界点', latex: '$x=0$（二重根）、$x=3$', why: '$x^2$ 恒非负，所以符号主要由 $x-3$ 决定。' },
                  { action: '判符号', latex: '$x<0:f\'<0$; $0<x<3:f\'<0$; $x>3:f\'>0$', why: '$x<3$ 时 $x-3<0$，故 $f\'\\leq0$；$x>3$ 时为正。' },
                  { action: '判断 $x=0$', latex: '$f\'$ 在 $x=0$ 两侧都是负，符号不变', why: '这里没有极值，它属于水平拐点（切线水平但函数继续下降）。' },
                  { action: '判断 $x=3$', latex: '$f\':-\\to+$，极小值 $f(3)=81-108=-27$', why: '符号由负变正，是极小值点。' },
                ],
                result: '极小值 $f(3)=-27$；$x=0$ 是水平拐点，不是极值。',
                check: '$f\'$ 在 $x=0$ 处为零但不变号，与 $y=x^3$ 在原点的情形类似 ✓。',
                pitfall: '千万别看到 $f\'(c)=0$ 就断言有极值。一定要检查两侧符号是否真的改变。',
              },
            ],
            mistakes: [
              { title: '$f\'=0$ 只是候选', text: '临界点不等于极值点。$x^3$ 在原点导数为零却是水平拐点。检查两侧符号是必不可少的步骤。' },
              { title: '导数不存在的点也是临界点', text: '$|x|$ 在原点不可导，但那里是极小值。找临界点时既要看 $f\'=0$，也要看 $f\'$ 不存在的点。' },
            ],
            summary: [
              { text: '一阶导数的符号决定单调性：$f\'>0$ 递增，$f\'<0$ 递减。极值出现在导数变号的临界点：「正变负」是极大，「负变正」是极小；不变号就是水平拐点。符号表是把这些信息理清楚的好工具。' },
            ],
          },
        },
        {
          id: 'p4c5t2',
          title: '凹凸性与拐点',
          objective: '会用二阶导数判断凹凸性，找到并验证拐点',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '只知道上坡下坡还不够。同样在上升，有的曲线越走越陡，有的越走越平。二阶导数专门描述这种「弯曲方向」。',
              },
            ],
            plain: [
              {
                text: '$f\'\'>0$ 时图像**凹向上**，像一只碗（笑脸），斜率不断增大；$f\'\'<0$ 时**凹向下**，像一座拱桥（哭脸），斜率不断减小。曲线从凹向上换成凹向下（或反过来）的那个点，叫**拐点**——它是「弯法改变」的地方。',
              },
            ],
            definition: [
              {
                title: '凹凸性与拐点',
                text: '若 $f\'\'>0$，称图像凹向上（concave up）；若 $f\'\'<0$，称凹向下（concave down）。若函数在点 $c$ 两侧的凹性相反，则 $(c,f(c))$ 是**拐点**。拐点处通常 $f\'\'(c)=0$ 或 $f\'\'(c)$ 不存在，但反过来不成立：$f\'\'(c)=0$ 的点未必是拐点。',
              },
            ],
            keyFormulas: [
              { latex: 'f\'\'>0\\Rightarrow\\text{凹向上};\\quad f\'\'<0\\Rightarrow\\text{凹向下}', meaning: '二阶导数符号决定凹凸性', display: 'block' },
              { latex: '\\text{拐点}\\Rightarrow f\'\'(c)=0\\ \\text{或不存在}', meaning: '拐点的必要条件', note: '还需检查两侧凹性是否真的改变' },
              { latex: 'f\'(c)=0,\\ f\'\'(c)>0\\Rightarrow\\text{极小};\\quad f\'\'(c)<0\\Rightarrow\\text{极大}', meaning: '二阶导数判别法（$f\'\'(c)=0$ 时失效）' },
            ],
            figure: {
              kind: 'function',
              initialFn: 'x^3',
              caption: '观察 $y=x^3$：原点左侧凹向下、右侧凹向上，原点就是拐点。注意它在原点处还有水平切线。',
            },
            examplesBasic: [
              {
                title: '用二阶导数找拐点',
                level: 'basic',
                asking: '求 $f(x)=x^3-3x^2+2$ 的凹凸区间与拐点。',
                given: ['$f(x)=x^3-3x^2+2$'],
                method: ['求一阶、二阶导数', '由 $f\'\'$ 的符号判凹凸', '验证两侧变号'],
                steps: [
                  { action: '求一阶导数', latex: '$f\'(x)=3x^2-6x$', why: '逐项求导。' },
                  { action: '求二阶导数', latex: '$f\'\'(x)=6x-6=6(x-1)$', why: '对 $f\'$ 再求导。' },
                  { action: '找二阶零点', latex: '$f\'\'(x)=0\\Rightarrow x=1$', why: '这是拐点的候选位置。' },
                  { action: '判凹凸', latex: '$x<1:f\'\'<0$ 凹向下；$x>1:f\'\'>0$ 凹向上', why: '$6(x-1)$ 的符号由 $x-1$ 决定。' },
                  { action: '确定拐点', latex: '$f(1)=1-3+2=0$，拐点 $(1,0)$', why: '两侧凹性相反，确为拐点；代回原函数求纵坐标。' },
                ],
                result: '凹向下区间 $(-\\infty,1)$，凹向上区间 $(1,+\\infty)$，拐点 $(1,0)$。',
                check: '$x^3-3x^2+2$ 的最高次项为正，左下右上，中部弯曲方向在 $x=1$ 改变，符合 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '$f\'\'=0$ 不一定是拐点',
                level: 'advanced',
                asking: '比较 $f(x)=x^3$ 与 $g(x)=x^4$ 在 $x=0$ 处是否为拐点。',
                given: ['$f(x)=x^3$', '$g(x)=x^4$'],
                method: ['分别求二阶导数', '检查二阶导数在 0 两侧的符号是否相反'],
                steps: [
                  { action: '求 $f$ 的二阶导数', latex: '$f\'(x)=3x^2,\\quad f\'\'(x)=6x$', why: '逐阶求导。' },
                  { action: '判断 $f$', latex: '$x<0:f\'\'<0$; $x>0:f\'\'>0$，符号相反', why: '凹性在 0 处改变，故 $(0,0)$ 是拐点（也是水平拐点）。' },
                  { action: '求 $g$ 的二阶导数', latex: '$g\'(x)=4x^3,\\quad g\'\'(x)=12x^2$', why: '逐阶求导。' },
                  { action: '判断 $g$', latex: '$g\'\'(0)=0$，但 $x\\neq0$ 时 $g\'\'>0$ 恒成立', why: '两侧都是凹向上，凹性没变，故 $(0,0)$ 不是拐点。' },
                ],
                result: '$x^3$ 在原点有拐点；$x^4$ 虽有 $g\'\'(0)=0$，但没有拐点。',
                check: '$x^4$ 的图像是一直向上弯的「平底碗」，原点只是最平坦处，不是弯法改变处 ✓。',
                pitfall: '找到 $f\'\'=0$ 只能算「候选」。必须检查左右两侧的符号，这一步省不得。',
              },
            ],
            mistakes: [
              { title: '二阶导数判别法会失效', text: '当 $f\'(c)=0$ 且 $f\'\'(c)=0$ 时，二阶导数判别法什么也告诉不了你：$x^3$ 有水平拐点，$x^4$ 有极小值。这时回到一阶导数的符号表。' },
              { title: '拐点不是极值点', text: '拐点说的是「弯曲方向变了」，极值说的是「函数值由增转减或由减转增」，两回事。一个点可以既是水平拐点又不是极值。' },
            ],
            summary: [
              { text: '二阶导数管「弯法」：$f\'\'>0$ 凹向上像碗，$f\'\'<0$ 凹向下像拱；凹性改变处是拐点。拐点常满足 $f\'\'=0$，但 $f\'\'=0$ 只是候选，必须验证两侧符号。' },
            ],
          },
        },
        {
          id: 'p4c5t3',
          title: '函数最优化与边际分析',
          objective: '能求闭区间上的最值并解决简单最优化问题，理解边际成本与边际收入',
          minutes: 24,
          blocks: {
            background: [
              {
                text: '「用 20 米篱笆围出最大面积的菜园」「产量定为多少利润最高」——这类问题的共同目标是求函数的最大值或最小值。导数把「凭感觉试」变成「按步骤算」。',
              },
            ],
            plain: [
              {
                text: '最优化就是「找全局最高的山顶或最低的山谷」。做法很朴素：先把所有可能的候选点找齐（临界点和区间端点），再逐个代入比较，谁最大谁最小。经济学里管「再多生产一单位的成本」叫边际成本，它正是成本函数的导数。',
              },
            ],
            definition: [
              {
                title: '全局最值与求解步骤',
                text: '$f(c)$ 是区间上的**全局最大值**，指区间内所有 $x$ 都满足 $f(x)\\leq f(c)$；全局最小值类似。闭区间上连续函数一定有全局最值（极值定理）。求解四步：① 确定定义域；② 求导找临界点；③ 算出临界点与端点的函数值；④ 比较取最大/最小。',
              },
            ],
            keyFormulas: [
              { latex: '\\text{边际成本 }MC(x)=C\'(x)', meaning: '成本函数的导数是边际成本' },
              { latex: '\\text{边际收入 }MR(x)=R\'(x)', meaning: '收入函数的导数是边际收入' },
              { latex: 'P(x)=R(x)-C(x),\\ P\'(x)=0\\Rightarrow MR=MC', meaning: '利润最大时边际收入等于边际成本' },
            ],
            examplesBasic: [
              {
                title: '篱笆围最大面积',
                level: 'basic',
                asking: '用 20 米篱笆靠墙围一个矩形菜园（靠墙一边不用篱笆），求最大面积。',
                given: ['篱笆总长 20 米', '靠墙一边不用篱笆'],
                method: ['设变量建立面积函数', '求导找临界点', '比较端点'],
                steps: [
                  { action: '设变量', latex: '设垂直墙的边长为 $x$，则平行墙的边长为 $20-2x$', why: '三面篱笆：$x+x+(20-2x)=20$。要求 $x>0$ 且 $20-2x>0$，故 $0<x<10$。' },
                  { action: '建立面积函数', latex: '$A(x)=x(20-2x)=20x-2x^2$', why: '矩形面积 = 长 × 宽。' },
                  { action: '求导并找临界点', latex: '$A\'(x)=20-4x=0\\Rightarrow x=5$', why: '导数等于零时可能取极值。' },
                  { action: '判断并计算', latex: '$A\'\'(x)=-4<0$，故 $x=5$ 取最大值；$A(5)=5\\times10=50$', why: '二阶导数为负说明是极大值；端点处面积趋于 0。' },
                ],
                result: '垂直墙的边取 5 米、平行墙的边取 10 米时，最大面积为 50 平方米。',
                check: '端点 $x\\to0^+$ 或 $x\\to10^-$ 时面积都趋于 0，中间 $x=5$ 给 50，确实是全局最大 ✓。',
                pitfall: '应用题一定要写出定义域 $0<x<10$，否则端点比较没依据。',
              },
            ],
            examplesAdvanced: [
              {
                title: '利润最大化与边际分析',
                level: 'advanced',
                asking: '已知成本 $C(x)=x^2+10x+100$，收入 $R(x)=50x-x^2$，求利润最大时的产量与最大利润，并验证此时边际收入等于边际成本。',
                given: ['$C(x)=x^2+10x+100$', '$R(x)=50x-x^2$'],
                method: ['利润 = 收入 − 成本', '求导找临界点', '边际量 = 导数'],
                steps: [
                  { action: '建立利润函数', latex: '$P(x)=R(x)-C(x)=50x-x^2-(x^2+10x+100)=40x-2x^2-100$', why: '合并同类项：$50x-10x=40x$，$-x^2-x^2=-2x^2$。' },
                  { action: '求导找临界点', latex: '$P\'(x)=40-4x=0\\Rightarrow x=10$', why: '导数等于零的产量是候选。' },
                  { action: '确认是最大值', latex: '$P\'\'(x)=-4<0$，故 $x=10$ 为极大值点', why: '利润曲线开口向下，该极大值也是全局最大。' },
                  { action: '算最大利润', latex: '$P(10)=400-200-100=100$', why: '把 $x=10$ 代回利润函数。' },
                  { action: '验证边际条件', latex: '$MC=C\'(x)=2x+10\\Rightarrow MC(10)=30$; $MR=R\'(x)=50-2x\\Rightarrow MR(10)=30$', why: '两者相等，正是 $P\'=MR-MC=0$ 的体现。' },
                ],
                result: '产量 $x=10$ 时利润最大，最大利润为 100；此时 $MR=MC=30$。',
                check: '$P\'(x)=MR-MC=(50-2x)-(2x+10)=40-4x$ ✓，与直接求导一致。',
              },
            ],
            application: [
              {
                title: '边际是什么意思',
                text: '「边际」就是「再多一点点」。边际成本 $C\'(x)$ 是多生产一单位带来的成本增量，边际收入 $R\'(x)$ 是多卖一单位带来的收入增量。当 $MR>MC$ 时再生产还赚钱，当 $MR<MC$ 时就亏了，所以利润最高点恰好在 $MR=MC$ 处。',
              },
            ],
            ai: [
              {
                title: '和机器学习的联系',
                text: '企业最小化成本、最大化利润，本质上都是「找一个函数的最值」。训练人工智能模型时，我们要最小化的是「损失函数」——思路完全一样：写出目标函数，求它的导数，找让导数为零的位置。第六章把这条路走完。',
              },
            ],
            mistakes: [
              { title: '别忘了端点', text: '闭区间上的最值可能出现在端点，不能只比较临界点。应用题里端点常常对应「不生产」这种极端方案。' },
              { title: '先写定义域', text: '长度、产量这类量必须非负，而且往往有上限。先把 $x$ 的允许范围写清楚，最值分析才有意义。' },
            ],
            summary: [
              { text: '最优化的标准流程：**写目标函数 → 定定义域 → 求导找临界点 → 连端点一起比较**。经济学里成本、收入、利润的导数分别叫边际成本、边际收入、边际利润；利润最大时 $MR=MC$。这与机器学习里最小化损失函数是同一套思想。' },
            ],
          },
        },
        {
          id: 'p4c5t4',
          title: '相关变化率、速度与加速度',
          objective: '会建立变量间的方程并对时间求导，解决相关变化率问题',
          minutes: 22,
          blocks: {
            background: [
              {
                text: '往气球里吹气，体积变大的同时半径也在变。已知体积每秒增加多少，能不能算出半径每秒增加多少？两个量被一个公式绑在一起，它们的「变化速度」也被绑在一起——这就是相关变化率。',
              },
            ],
            plain: [
              {
                text: '把相关变化率想成「按同一只时钟进位」。体积 $V$ 和半径 $r$ 都随时间 $t$ 变化，但它们之间有公式 $V=\\frac43\\pi r^3$ 牵着。对时间 $t$ 求导，公式就变成变化率之间的关系，已知一个就能解出另一个。',
              },
            ],
            definition: [
              {
                title: '相关变化率的四步法',
                text: '① 读题，列出所有量，用字母表示（注意哪些随时间变）；② 找一个把这些量联系起来的方程（常用几何公式）；③ 对方程两边关于时间 $t$ 求导（含变量的项用隐函数求导法则）；④ 代入已知数值，解出要求的变化率。',
              },
            ],
            symbols: [
              {
                text: '$\\dfrac{dV}{dt}$ 读作「体积对时间的变化率」，单位如 $\\text{cm}^3/\\text{s}$；$\\dfrac{dr}{dt}$ 是半径的变化率，单位如 $\\text{cm}/\\text{s}$。变化率带正负号：正表示增加，负表示减少。',
              },
            ],
            keyFormulas: [
              { latex: 'V=\\frac{4}{3}\\pi r^3\\Rightarrow\\frac{dV}{dt}=4\\pi r^2\\frac{dr}{dt}', meaning: '球体积与半径的变化率关系', display: 'block' },
              { latex: 'x^2+y^2=L^2\\Rightarrow x\\frac{dx}{dt}+y\\frac{dy}{dt}=0', meaning: '直角三角形两边的变化率关系' },
            ],
            examplesBasic: [
              {
                title: '气球膨胀',
                level: 'basic',
                asking: '给球形气球充气，体积以 $100\\ \\text{cm}^3/\\text{s}$ 的速率增加。当半径为 $5\\ \\text{cm}$ 时，半径增加的速率是多少？',
                given: ['$\\dfrac{dV}{dt}=100\\ \\text{cm}^3/\\text{s}$', '$r=5\\ \\text{cm}$'],
                method: ['球体积公式', '四步法：对时间求导'],
                steps: [
                  { action: '列量并建方程', latex: '$V=\\frac{4}{3}\\pi r^3$', why: '体积与半径由球的体积公式联系。' },
                  { action: '两边对 $t$ 求导', latex: '$\\frac{dV}{dt}=\\frac{4}{3}\\pi\\cdot3r^2\\frac{dr}{dt}=4\\pi r^2\\frac{dr}{dt}$', why: '$r$ 是 $t$ 的函数，用链式法则多乘一个 $\\frac{dr}{dt}$。' },
                  { action: '代入已知', latex: '$100=4\\pi(5)^2\\frac{dr}{dt}=100\\pi\\frac{dr}{dt}$', why: '把 $\\frac{dV}{dt}=100$、$r=5$ 代入。' },
                  { action: '解出', latex: '$\\frac{dr}{dt}=\\frac{100}{100\\pi}=\\frac{1}{\\pi}\\ \\text{cm/s}$', why: '两边除以 $100\\pi$。' },
                ],
                result: '半径以 $\\dfrac{1}{\\pi}\\ \\text{cm/s}$（约 $0.318\\ \\text{cm/s}$）的速率增加。',
                check: '半径越大，同样的体积增量分摊到更大的球面，半径增长应越来越慢；$\\frac{dr}{dt}\\propto\\frac{1}{r^2}$ 符合这个直觉 ✓。',
                pitfall: '别把 $\\frac{dV}{dt}$ 直接当成 $\\frac{dr}{dt}$；必须先通过体积公式把两者联系起来。',
              },
            ],
            examplesAdvanced: [
              {
                title: '梯子下滑',
                level: 'advanced',
                asking: '长 10 米的梯子斜靠在墙上，底端以 $2\\ \\text{m/s}$ 的速度远离墙。当底端离墙 6 米时，顶端沿墙下滑的速度是多少？',
                given: ['梯长 $L=10$ 米', '$\\dfrac{dx}{dt}=2\\ \\text{m/s}$', '此刻 $x=6$ 米'],
                method: ['勾股定理建方程 $x^2+y^2=100$', '对时间隐函数求导', '代入求解'],
                steps: [
                  { action: '建立方程', latex: '$x^2+y^2=10^2=100$', why: '梯子、墙、地面构成直角三角形。' },
                  { action: '求此时的 $y$', latex: '$6^2+y^2=100\\Rightarrow y^2=64\\Rightarrow y=8$', why: '顶端离地高度为 8 米。' },
                  { action: '两边对 $t$ 求导', latex: '$2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=0$', why: '$x,y$ 都随 $t$ 变化，隐函数求导。' },
                  { action: '代入已知', latex: '$2(6)(2)+2(8)\\frac{dy}{dt}=0\\Rightarrow24+16\\frac{dy}{dt}=0$', why: '代入 $x=6$、$y=8$、$\\frac{dx}{dt}=2$。' },
                  { action: '解出并解释符号', latex: '$\\frac{dy}{dt}=-\\frac{24}{16}=-1.5\\ \\text{m/s}$', why: '负号表示 $y$ 在减小，即顶端向下滑。' },
                ],
                result: '顶端以 $1.5\\ \\text{m/s}$ 的速度沿墙下滑。',
                check: '底端远离墙时顶端必然下滑，负号方向正确；大小 $1.5$ 小于底端速度 $2$，与 $y>x$ 的几何关系一致 ✓。',
                pitfall: '负号不能丢。它承担了「向下」这个方向信息，答案里要说明「下滑 $1.5\\ \\text{m/s}$」。',
              },
            ],
            application: [
              {
                title: '速度、加速度与变化率家族',
                text: '位移 $s(t)$ 对时间的导数是速度 $v(t)=s\'(t)$，速度的导数是加速度 $a(t)=s\'\'(t)$。上抛小球 $s(t)=-4.9t^2+20t$，则 $v(t)=-9.8t+20$、$a(t)=-9.8$。速度、加速度、气球增长率、梯子下滑速度，全是「对时间求导」这一件事的不同外衣。',
              },
            ],
            mistakes: [
              { title: '变化率 ≠ 量本身', text: '$\\frac{dr}{dt}$ 是「半径变化多快」，单位是长度/时间；$r$ 是半径本身，单位是长度。列式时带上单位，能帮你及时发现量纲错误。' },
              { title: '负号要解释', text: '求得负的变化率通常表示「减小」。写答案时把方向说清楚，比如「顶端以 $1.5\\ \\text{m/s}$ 下滑」，而不是只写一个负数。' },
            ],
            summary: [
              { text: '相关变化率四步法：**列量 → 找方程 → 对时间 $t$ 求导 → 代入求解**。核心技术是隐函数求导。速度、加速度、边缘增长、梯子下滑都是它的应用；记得给负号写出方向解释。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第六章 导数与人工智能 ============================ */
    {
      id: 'p4c6',
      number: 6,
      title: '导数与人工智能',
      intro:
        '前面所有的准备，都在为这一章铺路。一个训练中的 AI 模型，本质上是在做一件很朴素的事：给自己的错误打分，然后不断调整参数让分数变好。这个「调整」靠的正是导数。我们把第五章的最优化思路搬过来，看看梯度下降是怎么工作的。',
      outcomes: [
        '理解损失函数衡量模型误差，训练就是最小化损失',
        '理解导数为参数调整提供方向信息',
        '初步理解梯度是多元函数的「多把导数」',
        '能用更新公式手算几步梯度下降',
      ],
      topics: [
        {
          id: 'p4c6t1',
          title: '什么是损失函数与函数最小化',
          objective: '理解损失函数衡量预测误差，会把最小化问题写成求导问题',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '模型也需要「扣分表」',
                text: '学生做错题会被扣分，模型预测错了也要「扣分」。这张扣分表就是损失函数：预测越离谱，扣分越多。训练模型的目标，说到底就是想办法让总分最少。',
              },
            ],
            plain: [
              {
                text: '假设我们在拟合一条直线 $y=wx$，唯一的未知数是斜率 $w$。给定几个真实例子，每个例子都会因为 $w$ 选得不好而产生误差。把所有误差的平方加起来求平均，得到一个只依赖 $w$ 的函数 $L(w)$——这就是损失函数。$w$ 相当于函数里的自变量，$L(w)$ 越小代表模型越准。',
              },
            ],
            definition: [
              {
                title: '损失函数与最小化问题',
                text: '**损失函数** $L(w)$ 把模型的参数映射到「误差有多大」这个数。训练模型就是求 $$w^*=\\arg\\min_{w} L(w)$$ 即找到让 $L$ 取最小值的参数 $w^*$。第五章求最值与最优化的步骤，在这里一字不改地适用。',
              },
            ],
            symbols: [
              {
                text: '$\\arg\\min$ 读作「使……取最小的那个自变量」，注意它返回的是 $w$ 的取值，而不是最小值本身。$w$ 是**参数**（模型要学的未知数），$L$ 是损失值。上标「帽」$\\hat{y}$ 表示模型的预测值，$y$ 是真实值。',
              },
            ],
            figure: {
              kind: 'function',
              initialFn: 'w^2-4*w+7',
              caption: '把损失函数 $L(w)=w^2-4w+7$ 画出来，它像一口碗。碗底附近误差最小，我们要求参数至少落在那里。',
            },
            keyFormulas: [
              { latex: 'L(w)=\\frac{1}{n}\\sum_{i=1}^{n}\\left(\\hat{y}_i-y_i\\right)^2', meaning: '均方误差（MSE）：预测与真实差距的平方再平均', note: '$n$ 是样本数，平方让正负误差都算作「错」', display: 'block' },
              { latex: 'w^*=\\arg\\min_{w}L(w)', meaning: '训练目标：找使损失最小的参数', display: 'block' },
            ],
            examplesBasic: [
              {
                title: '算一次均方误差',
                level: 'basic',
                asking: '两个样本的真实值是 $y_1=1,\\,y_2=3$，模型预测 $\\hat{y}_1=2,\\,\\hat{y}_2=2$，求均方误差。',
                given: ['$y_1=1,\\ y_2=3$', '$\\hat{y}_1=2,\\ \\hat{y}_2=2$', '样本数 $n=2$'],
                method: ['均方误差公式', '逐样本算误差再平方'],
                steps: [
                  { action: '写公式', latex: '$L=\\frac{1}{2}\\left[(\\hat{y}_1-y_1)^2+(\\hat{y}_2-y_2)^2\\right]$', why: '$n=2$，所以除以 2。' },
                  { action: '算各样本误差', latex: '$\\hat{y}_1-y_1=2-1=1,\\qquad \\hat{y}_2-y_2=2-3=-1$', why: '误差有正有负，直接相加会抵消。' },
                  { action: '平方并平均', latex: '$L=\\frac{1}{2}\\left[1^2+(-1)^2\\right]=\\frac{1}{2}(1+1)=1$', why: '平方让正负误差都变成正的贡献。' },
                ],
                result: '均方误差 $L=1$。',
                check: '若换成更差的预测 $\\hat{y}_1=0,\\hat{y}_2=0$，误差平方和为 $1+9=10$，平均 5，比 1 大，符合「越离谱扣分越多」✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '把最小化变成求导',
                level: 'advanced',
                asking: '设损失函数 $L(w)=w^2-4w+7$，求使损失最小的参数 $w$ 及最小损失。',
                given: ['$L(w)=w^2-4w+7$'],
                method: ['第五章最优化：求导找临界点', '二阶导数确认极小'],
                steps: [
                  { action: '求一阶导数', latex: '$L\'(w)=2w-4$', why: '逐项求导，常数 7 导数为 0。' },
                  { action: '令导数为零', latex: '$2w-4=0\\Rightarrow w=2$', why: '临界点是最小值的候选。' },
                  { action: '二阶导数确认', latex: '$L\'\'(w)=2>0$，故 $w=2$ 是极小值点', why: '二阶导数为正，说明是碗底；本题全局最小也在那里。' },
                  { action: '算最小损失', latex: '$L(2)=4-8+7=3$', why: '把 $w=2$ 代回损失函数。' },
                ],
                result: '$w=2$ 时损失最小，最小损失 $L=3$。',
                check: '$L(w)=(w-2)^2+3$，配方后一眼看出最小值为 3、在 $w=2$ 处取得 ✓。',
                pitfall: '训练里我们通常没法「配方看出答案」，因为真实损失函数复杂得多。所以接下来要学用导数一步步找——这才是梯度下降的用武之地。',
              },
            ],
            ai: [
              {
                title: '这就是训练的本质',
                text: '神经网络有成百万个参数，损失函数是它们的高维函数。训练 = 找让这个函数最小的那组参数。我们不可能把高维函数画出来，但可以靠导数（下一节的梯度）一点一点往下走。',
              },
            ],
            mistakes: [
              { title: '$w$ 才是自变量', text: '在 $L(w)$ 里，样本数据是固定的，$w$ 是唯一能调整的量。别把样本当成变量去求导。' },
              { title: '损失越小越好', text: '损失函数衡量的是「错得多离谱」。训练的目标是把 $L$ 压低，不是把它抬高。这个方向感是后面所有内容的前提。' },
            ],
            summary: [
              { text: '损失函数 $L(w)$ 给模型的错误打分，均方误差 $L=\\frac1n\\sum(\\hat y_i-y_i)^2$ 是最常见的例子。训练模型就是求 $\\arg\\min_w L(w)$——一个标准的函数最小化问题。真实模型参数太多，没法直接解方程，于是我们请出导数。' },
            ],
          },
        },
        {
          id: 'p4c6t2',
          title: '导数与模型优化、梯度的初步理解',
          objective: '理解导数如何为参数调整指路，建立梯度的直观印象',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '知道损失函数像一口碗之后，问题变成：站在碗壁的某处，怎么往下走？导数是我们的「坡度计」，它告诉我们往哪个方向调参数能让损失变小。',
              },
            ],
            plain: [
              {
                text: '在一元函数里，如果 $L\'(w)>0$，说明 $w$ 增大损失会变大，那就该把 $w$ 调小；如果 $L\'(w)<0$，就该调大。导数的符号直接给出「往左还是往右」。到了多个参数，$L$ 的每个参数各有一个导数，把它们装成一个箭头，这个箭头叫**梯度**，它指向损失上升最快的方向；反过来走，就是下降最快的方向。',
              },
            ],
            definition: [
              {
                title: '梯度的初步理解',
                text: '对多元损失函数 $L(w_1,w_2,\\dots,w_n)$，把「固定其他参数、只对某一个参数求导」得到的多个导数排成一个向量，就叫**梯度**，记作 $\\nabla L$。它指向函数增长最快的方向，$-\\nabla L$ 指向下降最快的方向。多元求导的严格记号会在后续课程展开，这里先把它理解为「给每个参数各算一把导数」。',
              },
            ],
            derivation: {
              intro: '导数的符号为什么能指路？看它在某点附近的近似：',
              steps: [
                { action: '用导数近似变化', latex: '$L(w+\\Delta w)\\approx L(w)+L\'(w)\\,\\Delta w$', why: '这是导数的一阶近似（线性化），$\\Delta w$ 很小时成立。' },
                { action: '若 $L\'(w)>0$', latex: '取 $\\Delta w<0\\Rightarrow L\'(w)\\Delta w<0\\Rightarrow L$ 减小', why: '把 $w$ 往小调，损失就下降。' },
                { action: '若 $L\'(w)<0$', latex: '取 $\\Delta w>0\\Rightarrow L\'(w)\\Delta w<0\\Rightarrow L$ 减小', why: '把 $w$ 往大调，损失就下降。' },
              ],
              conclusion: '两种情况可以统一成一条规则：朝着 $-L\'(w)$ 的方向走，损失一定减小。这正是下一节更新公式的来源。',
            },
            keyFormulas: [
              { latex: 'L\'(w)>0\\Rightarrow\\text{减小 }w;\\quad L\'(w)<0\\Rightarrow\\text{增大 }w', meaning: '一元情形下导数符号给出的调整方向', display: 'block' },
              { latex: '\\nabla L=\\left(\\frac{\\partial L}{\\partial w_1},\\frac{\\partial L}{\\partial w_2},\\dots\\right)', meaning: '梯度：每个参数各求一次导数组成的向量', note: '初学可理解为「对各参数分别求导」' },
              { latex: '-\\nabla L\\ \\text{指向损失下降最快的方向}', meaning: '负梯度方向是优化的方向' },
            ],
            figure: {
              kind: 'gradient',
              initialFn: 'x^2+2*y^2',
              caption: '观察函数 $L=x^2+2y^2$ 的梯度箭头：它们总指向「上坡最陡」的方向，沿反方向走就能最快接近谷底 $(0,0)$。',
            },
            examplesBasic: [
              {
                title: '导数告诉你往哪调',
                level: 'basic',
                asking: '设 $L(w)=(w-3)^2$，当前 $w=5$。导数告诉你该把 $w$ 调大还是调小？',
                given: ['$L(w)=(w-3)^2$', '当前 $w=5$'],
                method: ['求导', '看导数的符号'],
                steps: [
                  { action: '求导（链式）', latex: '$L\'(w)=2(w-3)\\cdot1=2(w-3)$', why: '外层平方、内层 $w-3$，链式法则。' },
                  { action: '代入当前值', latex: '$L\'(5)=2(5-3)=4>0$', why: '导数为正。' },
                  { action: '判断方向', latex: '$L\'>0\\Rightarrow$ 应减小 $w$', why: '导数为正表示继续增大 $w$ 会让损失变大，往小调才对。' },
                ],
                result: '应把 $w$ 往小的方向调（朝 3 靠近）。',
                check: '$L(5)=4$，$L(4)=1$，确实调小后损失下降 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '两个参数时的梯度',
                level: 'advanced',
                asking: '设 $L(w,b)=w^2+b^2$，当前 $(w,b)=(1,2)$，求梯度并指出下降方向。',
                given: ['$L(w,b)=w^2+b^2$', '当前位置 $(1,2)$'],
                method: ['分别对 $w$、$b$ 求导', '组成梯度向量，取反得下降方向'],
                steps: [
                  { action: '对 $w$ 求导', latex: '$\\frac{\\partial L}{\\partial w}=2w$，在 $w=1$ 处为 $2$', why: '把 $b$ 当作常数，只对 $w$ 求导。' },
                  { action: '对 $b$ 求导', latex: '$\\frac{\\partial L}{\\partial b}=2b$，在 $b=2$ 处为 $4$', why: '把 $w$ 当作常数，只对 $b$ 求导。' },
                  { action: '组成梯度', latex: '$\\nabla L(1,2)=(2,4)$', why: '两个方向的导数排成向量，指向上坡最陡处。' },
                  { action: '取下降方向', latex: '$-\\nabla L=(-2,-4)$', why: '两个参数都应往小的方向调，才能靠近谷底 $(0,0)$。' },
                ],
                result: '梯度为 $(2,4)$，下降方向为 $(-2,-4)$。',
                check: '从 $(1,2)$ 往 $(-2,-4)$ 方向走一小步，$L$ 从 $1+4=5$ 减小，符合 ✓。',
                pitfall: '梯度是向量，有多个分量；别把它当成某一个单独的导数。每个分量对应一个参数。',
              },
            ],
            ai: [
              {
                title: '梯度是模型的指南针',
                text: '真实神经网络有上亿个参数，梯度也就有上亿个分量。但原理和这里的两个参数完全一样：为每个参数算一把导数，组合成梯度，然后朝反方向走一小步。算梯度的方法叫反向传播，本质上就是反复套用我们前面学的链式法则。',
              },
            ],
            mistakes: [
              { title: '梯度指向「上升」不是「下降」', text: '$\\nabla L$ 指向增长最快的方向，要优化得走反方向 $-\\nabla L$。正负号搞反，模型会越训越差。' },
              { title: '梯度是向量', text: '多元函数在每个参数方向都有一个导数，梯度把它们装在一起。多元求导的严格记号后续课程会讲，这里先抓住「分别求导、组合成箭头」的直觉。' },
            ],
            summary: [
              { text: '导数的符号告诉参数该往哪调：$L\'>0$ 就调小，$L\'<0$ 就调大，统一成「朝 $-L\'$ 方向走」。多参数时，各参数的导数组成梯度 $\\nabla L$，它指向上升最快处，$-\\nabla L$ 才是下降最快的方向。这就是优化的方向指南。' },
            ],
          },
        },
        {
          id: 'p4c6t3',
          title: '梯度下降的直观原理',
          objective: '掌握梯度下降更新公式，能手算几步并理解学习率的作用',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '复杂的损失函数没法一眼看出谷底在哪。梯度下降的办法很朴素：站在当前位置，感受脚下坡度，朝下坡迈一小步，然后重复。像蒙着眼睛下山，靠脚感一点点挪到谷底。',
              },
            ],
            plain: [
              {
                text: '每一步的更新公式是 $w_{\\text{新}}=w_{\\text{旧}}-\\eta\\,L\'(w_{\\text{旧}})$。这里 $\\eta$（读「伊塔」）叫**学习率**，是每步迈多大。减号保证我们朝损失下降的方向走。重复很多次，参数就会慢慢滑到谷底附近。',
              },
            ],
            derivation: {
              intro: '更新公式里的减号从哪来？从上一节的判断规则来：',
              steps: [
                { action: '$L\'>0$ 的情形', latex: '减小 $w$，即 $w_{\\text{新}}=w_{\\text{旧}}-\\eta L\'(w_{\\text{旧}})$', why: '此时 $L\'>0$，减号让 $w$ 变小，符合「调小」的结论。' },
                { action: '$L\'<0$ 的情形', latex: '$-\\eta L\'>0$，于是 $w$ 自动变大', why: '负负得正，公式自己实现了「调大」，无需分情况讨论。' },
                { action: '统一写法', latex: '$w\\leftarrow w-\\eta L\'(w)$', why: '一条公式覆盖两种情形，这就是梯度下降的核心迭代式。' },
              ],
              conclusion: '多参数时把 $L\'$ 换成梯度即可：$w\\leftarrow w-\\eta\\nabla L(w)$，形式完全一样。',
            },
            definition: [
              {
                text: '**梯度下降**：从某个初始参数出发，反复执行 $w\\leftarrow w-\\eta\\nabla L(w)$，直到损失不再明显下降。其中 $\\eta>0$ 是学习率，控制每步的大小；$\\nabla L$ 是当前位置的梯度。',
              },
            ],
            keyFormulas: [
              { latex: 'w_{\\text{新}}=w_{\\text{旧}}-\\eta\\,L\'(w_{\\text{旧}})', meaning: '一元梯度下降更新公式', note: '$\\eta>0$，减号保证朝下坡走', display: 'block' },
              { latex: 'w\\leftarrow w-\\eta\\nabla L(w)', meaning: '多参数版本：把导数换成梯度', display: 'block' },
            ],
            figure: {
              kind: 'gradient',
              initialFn: 'x^2',
              caption: '从碗壁上的起点出发，按 $w\\leftarrow w-\\eta\\,2w$ 一步步更新，观察参数如何逐渐靠近谷底 $w=0$。',
            },
            examplesBasic: [
              {
                title: '手算三步梯度下降',
                level: 'basic',
                asking: '设 $L(w)=w^2$，初始 $w_0=4$，学习率 $\\eta=0.1$，手算前三次更新。',
                given: ['$L(w)=w^2$', '$w_0=4$', '$\\eta=0.1$'],
                method: ['求 $L\'(w)=2w$', '套更新公式 $w\\leftarrow w-\\eta L\'(w)$'],
                steps: [
                  { action: '第一步', latex: '$L\'(4)=8$; $w_1=4-0.1\\times8=4-0.8=3.2$', why: '先算当前梯度 8，再往前迈 0.8。' },
                  { action: '第二步', latex: '$L\'(3.2)=6.4$; $w_2=3.2-0.1\\times6.4=3.2-0.64=2.56$', why: '坡度变小了，步子也变小。' },
                  { action: '第三步', latex: '$L\'(2.56)=5.12$; $w_3=2.56-0.1\\times5.12=2.56-0.512=2.048$', why: '继续靠近谷底。' },
                  { action: '看损失变化', latex: '$L(4)=16$, $L(3.2)=10.24$, $L(2.56)\\approx6.55$', why: '每一步损失都在下降，说明方向正确。' },
                ],
                result: '三次更新后 $w_3=2.048$，损失从 16 降到约 4.19，参数正朝 $w=0$ 靠近。',
                check: '解析最小值在 $w=0$；序列 $4\\to3.2\\to2.56\\to2.048$ 单调下降趋近 0 ✓。',
                pitfall: '学习率 $\\eta$ 要乘在「当前」的导数值上，每一步都重新算导数，不能一直用初始值 8。',
              },
            ],
            examplesAdvanced: [
              {
                title: '带偏移的损失函数与学习率',
                level: 'advanced',
                asking: '设 $L(w)=(w-2)^2$，初始 $w_0=5$，$\\eta=0.2$，手算前三次更新，并讨论学习率过大或过小会怎样。',
                given: ['$L(w)=(w-2)^2$', '$w_0=5$', '$\\eta=0.2$'],
                method: ['链式法则求 $L\'(w)=2(w-2)$', '迭代更新', '理解学习率的影响'],
                steps: [
                  { action: '第一步', latex: '$L\'(5)=2(5-2)=6$; $w_1=5-0.2\\times6=5-1.2=3.8$', why: '梯度为 6，朝小调 1.2。' },
                  { action: '第二步', latex: '$L\'(3.8)=2(3.8-2)=3.6$; $w_2=3.8-0.2\\times3.6=3.8-0.72=3.08$', why: '越接近谷底，梯度越小，步子越小。' },
                  { action: '第三步', latex: '$L\'(3.08)=2(3.08-2)=2.16$; $w_3=3.08-0.2\\times2.16=3.08-0.432=2.648$', why: '继续靠近最优值 2。' },
                  { action: '讨论学习率', latex: '$\\eta$ 太大（如 $\\eta=2$）会一步跨过谷底来回震荡；$\\eta$ 太小则寸步难行', why: '步长要适中：够大才走得快，够小才不会过冲。' },
                ],
                result: '三次更新后 $w_3=2.648$，正朝最优值 $w=2$ 收敛；学习率需取适中的正数。',
                check: '解析最优在 $w=2$；序列 $5\\to3.8\\to3.08\\to2.648$ 逐步逼近 2 ✓。',
                pitfall: '学习率必须为正。若取负号，更新就变成「朝上坡走」，损失会越训越大。',
              },
            ],
            ai: [
              {
                title: '神经网络的训练循环',
                text: '真实的训练就是这台机器的放大版：① 拿一批数据算出损失 $L$；② 用反向传播（链式法则的反复套用）算出所有参数的梯度 $\\nabla L$；③ 按 $w\\leftarrow w-\\eta\\nabla L$ 更新每个参数；④ 重复成千上万次。我们从差商极限一路走到这里，导数的故事正好闭合。',
              },
            ],
            mistakes: [
              { title: '学习率不是越大越好', text: '步子太大，会跨过谷底来回震荡甚至越走越远（发散）；步子太小，收敛慢。合适的学习率要靠经验与调试，这是机器学习里的重要超参数。' },
              { title: '每步都要重算梯度', text: '梯度随位置变化。更新公式用的是「当前位置」的梯度，每走一步都要重新计算，不能拿旧梯度一路用到底。' },
            ],
            summary: [
              { text: '梯度下降的更新公式是 $w\\leftarrow w-\\eta\\,L\'(w)$（多参数时换成 $\\nabla L$）。减号保证朝下坡走，学习率 $\\eta>0$ 控制步长。反复迭代，参数就会滑向让损失最小的位置——这正是 AI 模型「学习」的核心动作。从瞬时变化率到梯度下降，导数完成了从数学概念到智能引擎的旅程。' },
            ],
          },
        },
      ],
    },
  ],
};
