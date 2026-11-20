import type { Part } from '../types/course';

/**
 * 第三篇：极限与连续性
 * 依据 OpenStax Precalculus 2e 与 The Calculus Lifesaver（普林斯顿微积分读本）
 * 关键定义与例题已对照教材：3.2 单侧极限、3.6 三明治（夹逼）定理、
 * 5.1 连续性与介值/最值定理、附录 A.2 极限运算法则。
 */
export const part3: Part = {
  id: 'part3',
  number: 3,
  title: '极限与连续性',
  subtitle: '无限接近的艺术，从极限到连续',
  source: 'OpenStax Precalculus 2e 与 The Calculus Lifesaver（普林斯顿微积分读本）',
  intro:
    '微积分的大厦建立在「无限接近」这块基石上。导数、积分、级数，背后都是极限。这一篇我们先把极限的含义、计算和连续性彻底讲清楚：从「趋近」的直观，到左右极限、无穷极限，再到连续与间断，最后打磨一套求极限的计算工具。学完这一篇，你就真正跨进了微积分的门。',
  goal: '理解极限的严格与直观含义，熟练计算各类极限，掌握连续性的定义与间断点的分类，会用因式分解、有理化、通分、特殊极限和夹逼定理解决极限问题。',
  chapters: [
    /* ============================ 第一章 函数极限 ============================ */
    {
      id: 'p3c1',
      number: 1,
      title: '函数极限',
      intro:
        '函数是微积分的主角，极限是研究函数的第一件武器。这一章我们从「无限接近」说起，讲清极限到底是什么意思、左右极限为什么重要、极限怎么算，以及当函数值或自变量跑向无穷时该怎么办。',
      outcomes: [
        '能说清 $\\lim_{x\\to a}f(x)=L$ 的含义，理解「趋近」与「等于」的区别',
        '会求左极限与右极限，并用它们判断双侧极限是否存在',
        '掌握极限四则运算法则，能处理 $0/0$ 型代数化简',
        '会分析无穷极限与无穷远处的极限，识别垂直与水平渐近线',
      ],
      topics: [
        {
          id: 'p3c1t1',
          title: '极限是什么：从直观到严格',
          objective: '能说清 lim_{x→a}f(x)=L 的含义，区分「趋近」与「等于」',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '为什么需要「无限接近」',
                text: '想知道汽车在某一瞬间的速度，直接用「0 秒里走的路程除以 0 秒」会得到 $\\frac00$，这个式子没有意义。办法是先算 0.1 秒、0.01 秒、0.001 秒里的平均速度，看它们往哪个固定的数靠。这种「让间隔越来越小、观察结果趋向哪里」的思路，就是极限。导数和积分都是它的孩子。',
              },
            ],
            plain: [
              {
                title: '走向一堵永远走不到的墙',
                text: '想象你朝一堵墙走：第一步走剩下距离的一半，第二步再走一半的一半……你永远到不了墙，但你和墙的距离可以小到任何你想要的程度。极限描述的正是这种「无限靠近但不必到达」。写 $\\lim_{x\\to a}f(x)=L$，意思是当 $x$ 越来越靠近 $a$（保持 $x\\neq a$）时，$f(x)$ 越来越靠近 $L$。至于 $x=a$ 那一刻 $f$ 取什么值，极限根本不关心。',
              },
            ],
            definition: [
              {
                title: '朴素说法',
                text: '当 $x$ 无限接近 $a$ 但不等于 $a$ 时，$f(x)$ 无限接近常数 $L$，就称 $L$ 是 $f$ 在 $x\\to a$ 时的极限，记作 $\\lim_{x\\to a}f(x)=L$。',
              },
              {
                title: '严格的 ε-δ 定义（教材附录 A.2）',
                text: '对任意给定的 $\\varepsilon>0$，都存在一个 $\\delta>0$，使得只要 $0<|x-a|<\\delta$，就有 $|f(x)-L|<\\varepsilon$。直观理解：你先给出误差要求 $\\varepsilon$（希望 $f(x)$ 离 $L$ 多近），我总能找到一个输入窗口 $\\delta$，让落在这个窗口里的 $x$ 都满足你的要求。$0<|x-a|$ 里的「$0<$」排除了 $x=a$ 本身。',
              },
            ],
            symbols: [
              {
                title: '逐个符号拆',
                text: '$\\lim$ 是 limit（极限）的缩写；下标 $x\\to a$ 读作「$x$ 趋近于 $a$」，表示 $x$ 向 $a$ 靠近但不要求取到；$f(x)$ 是观察的对象；等号右边的 $L$ 是趋近的那个固定值。$\\varepsilon$（艾普西龙）管 $f(x)$ 的误差，$\\delta$（德尔塔）管 $x$ 的窗口大小，一个管输出，一个管输入。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: 'sin(x)/x',
              params: { target: 0 },
              caption: '拖动 $x$ 靠近 0，看 $\\frac{\\sin x}{x}$ 的值怎样越来越接近 1。注意 $x=0$ 处函数无定义，但极限照样存在——这正是「趋近不等于取到」。',
            },
            keyFormulas: [
              { latex: '\\lim_{x\\to a}f(x)=L', meaning: '极限记号：x 趋近 a 时 f(x) 趋近 L', display: 'block' },
              { latex: '\\forall\\varepsilon>0,\\ \\exists\\delta>0:\\ 0<|x-a|<\\delta\\Rightarrow|f(x)-L|<\\varepsilon', meaning: 'ε-δ 定义：对任意误差要求都能找到合适的输入窗口', note: '$0<|x-a|$ 排除 $x=a$ 本身；$\\varepsilon$ 管输出误差，$\\delta$ 管输入窗口', display: 'block' },
            ],
            examplesBasic: [
              {
                title: '用数值表观察极限',
                level: 'basic',
                asking: '观察 $f(x)=3x-1$ 当 $x$ 从两侧趋近 2 时的取值，猜测 $\\lim_{x\\to2}(3x-1)$。',
                given: ['$f(x)=3x-1$', '$x$ 分别从小于 2 和大于 2 的方向靠近 2'],
                method: ['取一列越来越靠近 2 的 $x$，算对应的 $f(x)$，看趋势'],
                steps: [
                  { action: '从左侧取点', latex: '$x=1.9\\Rightarrow f=4.7$; $x=1.99\\Rightarrow f=4.97$; $x=1.999\\Rightarrow f=4.997$', why: '这些点都小于 2 但越来越接近 2。' },
                  { action: '从右侧取点', latex: '$x=2.1\\Rightarrow f=5.3$; $x=2.01\\Rightarrow f=5.03$; $x=2.001\\Rightarrow f=5.003$', why: '这些点都大于 2 但越来越接近 2。' },
                  { action: '看趋势', latex: '两侧都趋向 $5$', why: '无论从哪边靠近，$f(x)$ 都在往 5 靠拢。' },
                ],
                result: '$\\lim_{x\\to2}(3x-1)=5$。',
                check: '直接代入 $x=2$ 得 $3\\times2-1=5$，与观察一致。代入能成立是因为这类函数连续（下一章讲）。',
                pitfall: '数值表只能「猜」极限，严格证明要靠定义或运算法则。',
              },
            ],
            examplesAdvanced: [
              {
                title: '用 ε-δ 定义证明极限',
                level: 'advanced',
                asking: '用 $\\varepsilon$-$\\delta$ 定义证明 $\\lim_{x\\to2}(3x-1)=5$。',
                given: ['$f(x)=3x-1$，$a=2$，$L=5$', '任意给定的 $\\varepsilon>0$'],
                method: ['从 $|f(x)-L|$ 出发反解出 $|x-a|$ 的范围', '取 $\\delta$ 为关于 $\\varepsilon$ 的表达式'],
                steps: [
                  { action: '化简误差表达式', latex: '$|f(x)-L|=|(3x-1)-5|=|3x-6|=3|x-2|$', why: '把 $|f(x)-L|$ 化成 $|x-a|$ 的倍数，方便找 $\\delta$。' },
                  { action: '设定目标', latex: '要让 $3|x-2|<\\varepsilon$，只需 $|x-2|<\\frac{\\varepsilon}{3}$', why: '把系数 3 移到右边。' },
                  { action: '取 delta', latex: '取 $\\delta=\\frac{\\varepsilon}{3}>0$', why: '这样 $\\delta$ 只依赖于 $\\varepsilon$，符合定义要求。' },
                  { action: '验证', latex: '$0<|x-2|<\\delta\\Rightarrow|f(x)-5|=3|x-2|<3\\cdot\\frac{\\varepsilon}{3}=\\varepsilon$', why: '一步步代回去，正好得到定义要求的不等式。' },
                ],
                result: '对任意 $\\varepsilon>0$，取 $\\delta=\\frac{\\varepsilon}{3}$ 即满足定义，故 $\\lim_{x\\to2}(3x-1)=5$。',
                check: '取 $\\varepsilon=0.03$ 得 $\\delta=0.01$；取 $x=2.005$，$|f(x)-5|=3\\times0.005=0.015<0.03$ ✓。',
                pitfall: '$\\delta$ 可以依赖 $\\varepsilon$，但不能依赖具体的 $x$。',
              },
            ],
            mistakes: [
              { title: '把极限当成 x=a 处的函数值', text: '$\\lim_{x\\to a}f(x)$ 只看 $a$ 附近的走势。比如 $\\frac{x^2-1}{x-1}$ 在 $x=1$ 无定义，极限却是 2。' },
              { title: '0/0 直接当答案', text: '代入得到 $\\frac00$ 是在提醒你需要进一步化简，$\\frac00$ 本身就是「还没算出来」的信号。' },
            ],
            summary: [
              { text: '极限描述「无限接近但不需到达」：$\\lim_{x\\to a}f(x)=L$ 只看 $x$ 靠近 $a$ 时 $f(x)$ 的走向。严格的 $\\varepsilon$-$\\delta$ 定义用 $\\varepsilon$ 管输出误差、$\\delta$ 管输入窗口。后面我们会用运算法则代替每次都做 $\\varepsilon$-$\\delta$。' },
            ],
          },
        },
        {
          id: 'p3c1t2',
          title: '左极限与右极限',
          objective: '会求单侧极限，能用左右极限判断双侧极限是否存在',
          minutes: 16,
          blocks: {
            background: [
              {
                title: '分段函数在分界点两侧长相不同',
                text: '很多函数（尤其是分段函数）在 $x=a$ 的左边和右边遵循不同的规则。这时候「从左边靠近」和「从右边靠近」看到的景象可能完全不同，必须分开考察。教材 3.2 节专门讲了这件事。',
              },
            ],
            plain: [
              {
                title: '从左边来和从右边来',
                text: '把 $x$ 轴想成一条路，$a$ 是路中间的一个路口。左极限就是你从路口的左边往前走、越来越靠近路口时看到的高度；右极限是你从右边往回走、越来越靠近路口时看到的高度。如果两边看到的高度不一样，那「从整个路靠近路口」就没有一个统一的高度，双侧极限也就不存在。',
              },
            ],
            definition: [
              {
                title: '单侧极限',
                text: '左极限 $\\lim_{x\\to a^-}f(x)$：只考虑 $x<a$ 且 $x\\to a$ 时的极限。右极限 $\\lim_{x\\to a^+}f(x)$：只考虑 $x>a$ 且 $x\\to a$ 时的极限。',
              },
              {
                title: '双侧极限存在的充要条件（教材 3.2）',
                text: '$\\lim_{x\\to a}f(x)=L$ 当且仅当 $\\lim_{x\\to a^-}f(x)=L$ 且 $\\lim_{x\\to a^+}f(x)=L$，也就是左右极限都存在并且相等。若左右极限不相等（或某侧不存在），则双侧极限不存在。',
              },
            ],
            symbols: [
              {
                title: '正负号写在 a 的右上角',
                text: '$a$ 右上角的减号表示从左侧靠近，加号表示从右侧靠近。教材特别提醒：这个符号要写在 $a$ 的后面（如 $x\\to3^-$），写成 $x\\to-3$ 就完全变了意思，那是在问 $x=-3$ 处的双侧极限。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: '1/(x-1)',
              params: { target: 1 },
              caption: '观察 $f(x)=\\frac{1}{x-1}$ 在 $x=1$ 两侧：从左侧靠近时函数趋向 $-\\infty$，从右侧靠近时趋向 $+\\infty$。两侧结果不同，所以 $x=1$ 处双侧极限不存在。',
            },
            keyFormulas: [
              { latex: '\\lim_{x\\to a}f(x)=L\\iff\\lim_{x\\to a^-}f(x)=L\\ \\text{且}\\ \\lim_{x\\to a^+}f(x)=L', meaning: '双侧极限存在当且仅当左右极限都存在且相等', note: '左右极限不相等时，双侧极限直接不存在', display: 'block' },
              { latex: '\\lim_{x\\to a^-}f(x)', meaning: '左极限：只从 a 的左侧靠近' },
              { latex: '\\lim_{x\\to a^+}f(x)', meaning: '右极限：只从 a 的右侧靠近' },
            ],
            examplesBasic: [
              {
                title: '分段函数在分界点的极限',
                level: 'basic',
                asking: '设 $f(x)=\\begin{cases}x+1,&x<0\\\\x^2,&x\\ge0\\end{cases}$，求 $x\\to0$ 时的左右极限与双侧极限。',
                given: ['$x<0$ 时 $f(x)=x+1$', '$x\\ge0$ 时 $f(x)=x^2$'],
                method: ['左侧用 $x+1$，右侧用 $x^2$，分别求极限后比较'],
                steps: [
                  { action: '求左极限', latex: '$\\lim_{x\\to0^-}f(x)=\\lim_{x\\to0^-}(x+1)=0+1=1$', why: '$x<0$ 时用第一段 $x+1$。' },
                  { action: '求右极限', latex: '$\\lim_{x\\to0^+}f(x)=\\lim_{x\\to0^+}x^2=0^2=0$', why: '$x>0$ 时用第二段 $x^2$。' },
                  { action: '比较', latex: '$1\\neq0$，左右极限不相等', why: '双侧极限存在的条件不满足。' },
                ],
                result: '$\\lim_{x\\to0^-}f(x)=1$，$\\lim_{x\\to0^+}f(x)=0$，双侧极限 $\\lim_{x\\to0}f(x)$ 不存在。',
                check: '图像在 $x=0$ 处从高度 1 跳到高度 0，有一个跳跃，符合「双侧极限不存在」✓。',
                pitfall: '$f(0)=0^2=0$，函数值等于右极限这件事，代表不了双侧极限存在。',
              },
            ],
            examplesAdvanced: [
              {
                title: '绝对值分式的单侧极限',
                level: 'advanced',
                asking: '求 $f(x)=\\frac{|x|}{x}$ 在 $x\\to0$ 时的左右极限与双侧极限。',
                given: ['$f(x)=\\frac{|x|}{x}$，$x\\neq0$', '绝对值定义：$|x|=x$（$x>0$），$|x|=-x$（$x<0$）'],
                method: ['按 $x$ 的正负去掉绝对值，再分别求单侧极限'],
                steps: [
                  { action: '当 $x>0$ 化简', latex: '$|x|=x\\Rightarrow\\frac{|x|}{x}=\\frac{x}{x}=1$', why: '$x>0$ 时绝对值就是它本身。' },
                  { action: '求右极限', latex: '$\\lim_{x\\to0^+}\\frac{|x|}{x}=1$', why: '右侧恒等于 1，极限就是 1。' },
                  { action: '当 $x<0$ 化简', latex: '$|x|=-x\\Rightarrow\\frac{|x|}{x}=\\frac{-x}{x}=-1$', why: '$x<0$ 时绝对值取相反数。' },
                  { action: '求左极限', latex: '$\\lim_{x\\to0^-}\\frac{|x|}{x}=-1$', why: '左侧恒等于 $-1$。' },
                  { action: '比较', latex: '$1\\neq-1$，双侧极限不存在', why: '左右极限不相等。' },
                ],
                result: '$\\lim_{x\\to0^+}\\frac{|x|}{x}=1$，$\\lim_{x\\to0^-}\\frac{|x|}{x}=-1$，双侧极限不存在。',
                check: '这是符号函数（sgn），图像在 $x=0$ 处从 $-1$ 跳到 $1$，符合✓。',
                pitfall: '约分 $\\frac{|x|}{x}$ 时不能把 $|x|$ 直接当 $x$，必须先按正负分段。',
              },
            ],
            mistakes: [
              { title: '上标位置写错', text: '$x\\to3^-$ 是从 3 的左侧靠近；写成 $x\\to-3$ 变成了在 $-3$ 处的双侧极限，两者毫无关系。' },
              { title: '函数值代替单侧极限', text: '单侧极限只关心一侧的走势，和 $f(a)$ 的取值没有关系。' },
            ],
            summary: [
              { text: '左极限看左边，右极限看右边；双侧极限存在要求左右极限都存在且相等。分段函数的分界点是考察单侧极限的高频场景。' },
            ],
          },
        },
        {
          id: 'p3c1t3',
          title: '极限的计算与基本运算法则',
          objective: '会用代入法和极限四则运算法则求极限，能处理简单的 0/0 代数化简',
          minutes: 20,
          blocks: {
            background: [
              {
                title: '不能每次都数点',
                text: '靠列表一格一格看趋势太慢。数学家证明了一组运算法则：只要各部分的极限存在且有限，和的极限等于极限的和、积的极限等于极限的积。有了它们，算极限就像算加减乘除一样机械。',
              },
            ],
            plain: [
              {
                title: '极限运算像「分而治之」',
                text: '面对一个复杂式子，先把它拆成几块，分别求每块的极限，再按四则运算拼回去。唯一要留心的是：拆开的前提是每一块的极限都存在且是有限数；商还要求分母的极限不为 0。教材附录 A.2 给出了这些法则的严格证明。',
              },
            ],
            definition: [
              {
                title: '四则运算法则（教材附录 A.2）',
                text: '设 $\\lim_{x\\to a}f(x)=L$、$\\lim_{x\\to a}g(x)=M$，且 $L,M$ 都是有限数，则：$\\lim(f\\pm g)=L\\pm M$；$\\lim(fg)=LM$；$\\lim\\frac{f}{g}=\\frac{L}{M}$（要求 $M\\neq0$）。常数倍：$\\lim(cf)=cL$。',
              },
              {
                title: '代入法的正当性',
                text: '如果 $f$ 在 $a$ 处连续，就有 $\\lim_{x\\to a}f(x)=f(a)$（教材 5.1 节）。所以多项式、以及分母不为 0 时的有理函数，都可以直接把 $a$ 代进去算极限，这正是连续性把「附近」和「在」连起来的功劳。',
              },
            ],
            symbols: [
              {
                title: '别漏掉前提',
                text: '法则里「$L,M$ 有限」「$M\\neq0$」是硬条件。比如 $\\lim_{x\\to0}\\frac{1}{x}$ 本身不存在，就不能拿它去做加减。出现 $\\frac00$、$\\frac{\\infty}{\\infty}$ 时法则失效，得先做代数变形。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: '(x^2-1)/(x-1)',
              params: { target: 1 },
              caption: '函数在 $x=1$ 处有个空心点（无定义），但 $x$ 靠近 1 时函数值靠近 2。先约分化简为 $x+1$，再代入就得到极限。',
            },
            keyFormulas: [
              { latex: '\\lim_{x\\to a}(f\\pm g)=\\lim f\\pm\\lim g', meaning: '和差的极限等于极限的和差', note: '前提：两个极限都存在且有限' },
              { latex: '\\lim_{x\\to a}(fg)=(\\lim f)(\\lim g)', meaning: '乘积的极限等于极限的乘积', note: '前提：两个极限都存在且有限' },
              { latex: '\\lim_{x\\to a}\\frac{f}{g}=\\frac{\\lim f}{\\lim g}', meaning: '商的极限等于极限的商', note: '额外要求分母极限不为 0' },
              { latex: '\\lim_{x\\to a}f(x)=f(a)\\quad(f\\ \\text{在 }a\\text{ 连续})', meaning: '连续函数可直接代入求极限' },
            ],
            derivation: {
              intro: '为什么多项式可以直接代入？以 $P(x)=x^2+3x-1$ 在 $x\\to2$ 为例：',
              steps: [
                { action: '用和的法则拆开', latex: '$\\lim_{x\\to2}(x^2+3x-1)=\\lim x^2+\\lim 3x-\\lim 1$', why: '和的极限等于极限的和，各项极限都存在。' },
                { action: '用积与常数倍法则', latex: '$=(\\lim x)(\\lim x)+3\\lim x-1$', why: '$x^2=x\\cdot x$，常数可以提出来。' },
                { action: '代入 $\\lim_{x\\to2}x=2$', latex: '$=2\\cdot2+3\\cdot2-1$', why: '$g(x)=x$ 连续，$\\lim_{x\\to2}x=2$。' },
                { action: '算结果', latex: '$=4+6-1=9$', why: '四则运算算出最终结果。' },
              ],
              conclusion: '这正是「把 $a$ 直接代进去」在多项式上成立的原因。',
            },
            examplesBasic: [
              {
                title: '用运算法则求多项式极限',
                level: 'basic',
                asking: '求 $\\lim_{x\\to2}(x^2+3x-1)$。',
                given: ['多项式 $x^2+3x-1$', '$x\\to2$'],
                method: ['极限四则运算法则', '多项式可直接代入'],
                steps: [
                  { action: '拆成三项', latex: '$\\lim x^2+\\lim 3x-\\lim 1$', why: '和的极限等于极限的和。' },
                  { action: '分别求', latex: '$\\lim_{x\\to2}x^2=4$，$ \\lim_{x\\to2}3x=6$，$ \\lim_{x\\to2}1=1$', why: '用积与常数倍法则，各项都存在。' },
                  { action: '合并', latex: '$4+6-1=9$', why: '把三块的极限按原来的加减号拼回去。' },
                ],
                result: '$\\lim_{x\\to2}(x^2+3x-1)=9$。',
                check: '直接代入：$2^2+3\\times2-1=4+6-1=9$ ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '先化简再代入',
                level: 'advanced',
                asking: '求 $\\lim_{x\\to1}\\frac{x^2-1}{x-1}$。',
                given: ['$\\frac{x^2-1}{x-1}$，$x\\neq1$', '代入 $x=1$ 得到 $\\frac00$'],
                method: ['平方差因式分解消去零因子', '再代入'],
                steps: [
                  { action: '检查代入', latex: '$\\frac{1^2-1}{1-1}=\\frac00$，说明需化简', why: '$0/0$ 不能直接代入，法则失效。' },
                  { action: '因式分解分子', latex: '$x^2-1=(x-1)(x+1)$', why: '平方差公式。' },
                  { action: '约分', latex: '$\\frac{(x-1)(x+1)}{x-1}=x+1\\quad(x\\neq1)$', why: '求极限时 $x$ 靠近 1 但不等于 1，可以约去 $(x-1)$。' },
                  { action: '再求极限', latex: '$\\lim_{x\\to1}(x+1)=1+1=2$', why: '$x+1$ 连续，可直接代入。' },
                ],
                result: '$\\lim_{x\\to1}\\frac{x^2-1}{x-1}=2$。',
                check: '取 $x=0.999$，$\\frac{0.999^2-1}{0.999-1}\\approx1.999$，接近 2 ✓。',
                pitfall: '约分只在 $x\\neq1$ 时成立，但极限恰好允许这一点，所以合法。',
              },
            ],
            mistakes: [
              { title: '忽略法则前提', text: '$\\lim f$ 和 $\\lim g$ 必须都存在且有限才能拆。拿 $\\lim_{x\\to0}\\frac1x$ 去套法则会出错。' },
              { title: '0/0 硬代入', text: '遇到 $\\frac00$ 先停下来做代数化简，别把它当成答案。' },
            ],
            summary: [
              { text: '极限四则运算法则让我们「分块计算再拼回」，前提是各块极限存在且有限。连续函数可以直接代入，这个便利来自连续性。遇到 $\\frac00$ 要先因式分解或有理化，把制造零的因子约掉。' },
            ],
          },
        },
        {
          id: 'p3c1t4',
          title: '无穷极限与无穷远处的极限',
          objective: '会分析函数值趋向无穷与自变量趋向无穷的极限，识别垂直与水平渐近线',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '两种「无穷」',
                text: '前面极限的答案是有限数。但有些情形里函数值会无限增大（$\\frac{1}{x}$ 在 $x\\to0^+$ 时），还有些情形是自变量 $x$ 自己越跑越远（$x\\to\\infty$ 时 $\\frac{1}{x}$ 趋向 0）。教材 3.3～3.5 节把这两类都纳入了极限的框架。',
              },
            ],
            plain: [
              {
                title: '垂直的墙与水平的地平线',
                text: '函数值冲向 $\\pm\\infty$ 时，图像贴着一条竖线往上或往下跑，这条竖线叫垂直渐近线；自变量跑到无穷远时，函数值贴近一条水平线，这条线叫水平渐近线。前者看的是「$x$ 靠近某点时 $f$ 爆炸」，后者看的是「$x$ 跑很远时 $f$ 趋于稳定」。',
              },
            ],
            definition: [
              {
                title: '无穷极限（函数值趋向无穷）',
                text: '$\\lim_{x\\to a}f(x)=+\\infty$ 表示：对任意大的数 $M>0$，只要 $x$ 足够靠近 $a$（且 $x\\neq a$），就有 $f(x)>M$。类似定义 $-\\infty$ 和单侧版本 $\\lim_{x\\to a^+}f(x)=+\\infty$ 等。若 $x\\to a$ 时某侧极限为 $\\pm\\infty$，则 $x=a$ 是垂直渐近线。',
              },
              {
                title: '无穷远处的极限（自变量趋向无穷）',
                text: '$\\lim_{x\\to+\\infty}f(x)=L$ 表示：当 $x$ 无限增大时，$f(x)$ 无限接近 $L$，此时 $y=L$ 是水平渐近线。也有 $x\\to-\\infty$ 的版本。注意 $+\\infty$、$-\\infty$ 只是趋势的记号，不是可以参与运算的普通实数。',
              },
            ],
            symbols: [
              {
                title: '∞ 的读法',
                text: '$+\\infty$ 读作「正无穷」，表示无限增大；$-\\infty$ 读作「负无穷」，表示无限减小。$\\lim_{x\\to+\\infty}$ 的下标说的是「$x$ 无限变大」，等号右边的 $+\\infty$ 说的是「函数值无限变大」，位置不同，含义不同。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: '1/x',
              params: { target: 0 },
              caption: '观察 $f(x)=\\frac1x$：$x\\to0^+$ 时 $f\\to+\\infty$、$x\\to0^-$ 时 $f\\to-\\infty$（$x=0$ 是垂直渐近线）；$x\\to\\pm\\infty$ 时 $f\\to0$（$y=0$ 是水平渐近线）。',
            },
            keyFormulas: [
              { latex: '\\lim_{x\\to0^+}\\frac{1}{x}=+\\infty,\\quad \\lim_{x\\to0^-}\\frac{1}{x}=-\\infty', meaning: '1/x 在 0 两侧冲向相反的无穷', note: '两侧结果不同，故 $\\lim_{x\\to0}\\frac1x$ 不存在', display: 'block' },
              { latex: '\\lim_{x\\to\\pm\\infty}\\frac{1}{x}=0', meaning: 'x 跑向无穷远时 1/x 趋于 0' },
              { latex: '\\lim_{x\\to\\infty}\\frac{a_nx^n+\\cdots}{b_mx^m+\\cdots}', meaning: '有理函数在无穷远处看最高次项：n<m 得 0，n=m 得 a_n/b_m，n>m 得 ±∞', display: 'block' },
            ],
            derivation: {
              intro: '有理函数在 $x\\to\\infty$ 时为什么只看最高次项？以 $\\lim_{x\\to\\infty}\\frac{2x^2+3x+1}{x^2-5}$ 为例：',
              steps: [
                { action: '分子分母同除以最高次 $x^2$', latex: '$\\frac{2x^2+3x+1}{x^2-5}=\\frac{2+\\frac{3}{x}+\\frac{1}{x^2}}{1-\\frac{5}{x^2}}$', why: '每一项都除以 $x^2$，分式的值不变。' },
                { action: '让 $x\\to\\infty$', latex: '$\\frac{3}{x}\\to0,\\ \\frac{1}{x^2}\\to0,\\ \\frac{5}{x^2}\\to0$', why: '分母趋于无穷的项都趋于 0。' },
                { action: '代入剩下的常数', latex: '$\\frac{2+0+0}{1-0}=2$', why: '只剩最高次项的系数之比。' },
              ],
              conclusion: '规律：次数相同看系数比；分子次数低得 0；分子次数高则趋于 $\\pm\\infty$（符号由最高次系数和 $x$ 的方向决定）。',
            },
            examplesBasic: [
              {
                title: '1/x 在 0 两侧的单侧极限',
                level: 'basic',
                asking: '求 $\\lim_{x\\to0^+}\\frac1x$ 与 $\\lim_{x\\to0^-}\\frac1x$，并判断 $x=0$ 处双侧极限是否存在。',
                given: ['$f(x)=\\frac1x$'],
                method: ['从左右两侧分别考察 $\\frac1x$ 的趋势'],
                steps: [
                  { action: '右侧', latex: '$x>0$ 且 $x\\to0$，$\\frac1x$ 是很大的正数', why: '正数除以越来越小的正数，结果越来越大。' },
                  { action: '写右极限', latex: '$\\lim_{x\\to0^+}\\frac1x=+\\infty$', why: '函数值无限增大。' },
                  { action: '左侧', latex: '$x<0$ 且 $x\\to0$，$\\frac1x$ 是绝对值很大的负数', why: '负数除以很小的负数得很大的负数。' },
                  { action: '写左极限', latex: '$\\lim_{x\\to0^-}\\frac1x=-\\infty$', why: '函数值无限减小。' },
                  { action: '比较', latex: '$+\\infty\\neq-\\infty$，双侧极限不存在', why: '两侧趋势不同。' },
                ],
                result: '$\\lim_{x\\to0^+}\\frac1x=+\\infty$，$\\lim_{x\\to0^-}\\frac1x=-\\infty$，$\\lim_{x\\to0}\\frac1x$ 不存在；$x=0$ 是垂直渐近线。',
                check: '取 $x=0.001$ 得 1000，取 $x=-0.001$ 得 $-1000$，趋势符合✓。',
                pitfall: '单侧极限可以记为 $\\pm\\infty$，但双侧极限在这里不存在，两种说法要分清语境。',
              },
            ],
            examplesAdvanced: [
              {
                title: '有理函数在无穷远处的极限',
                level: 'advanced',
                asking: '求 $\\lim_{x\\to\\infty}\\frac{2x^2+3x+1}{x^2-5}$。',
                given: ['分子 $2x^2+3x+1$，分母 $x^2-5$', '分子分母最高次都是 2'],
                method: ['分子分母同除以最高次幂 $x^2$', '利用 $\\frac{1}{x^k}\\to0$'],
                steps: [
                  { action: '同除以 $x^2$', latex: '$\\frac{2x^2+3x+1}{x^2-5}=\\frac{2+\\frac3x+\\frac1{x^2}}{1-\\frac5{x^2}}$', why: '分子分母每项都除以 $x^2$，值不变。' },
                  { action: '取极限', latex: '$\\lim_{x\\to\\infty}\\frac3x=0,\\ \\lim_{x\\to\\infty}\\frac1{x^2}=0,\\ \\lim_{x\\to\\infty}\\frac5{x^2}=0$', why: '常数除以无穷大趋于 0。' },
                  { action: '代入', latex: '$\\frac{2+0+0}{1-0}=2$', why: '用极限四则法则合成结果。' },
                ],
                result: '$\\lim_{x\\to\\infty}\\frac{2x^2+3x+1}{x^2-5}=2$，水平渐近线为 $y=2$。',
                check: '最高次系数比是 $2/1=2$ ✓。',
                pitfall: '若分子次数高于分母，结果是 $\\pm\\infty$，不是一个有限数。',
              },
            ],
            mistakes: [
              { title: '把 ∞ 当普通数运算', text: '$\\infty-\\infty$、$\\frac{\\infty}{\\infty}$ 都没有确定含义，遇到要先化为可处理的形式。' },
              { title: '混淆两个方向', text: '$x\\to0$ 时看的是 $x$ 靠近原点；$x\\to\\infty$ 时看的是 $x$ 跑向无穷远，两者研究的不是一回事。' },
            ],
            summary: [
              { text: '函数值冲向无穷给出垂直渐近线（看单侧极限），自变量冲向无穷给出水平渐近线（看 $x\\to\\pm\\infty$ 的极限）。有理函数在无穷远处由最高次项决定：同次看系数比，分子低次得 0，分子高次得无穷。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第二章 连续性 ============================ */
    {
      id: 'p3c2',
      number: 2,
      title: '连续性',
      intro:
        '连续，说白了就是「一笔画成、不断笔」。这一章我们把这份直觉变成可以逐条检查的定义，学会找间断点、给它们分类，并认识连续函数两个好用的性质——介值定理和最值定理。',
      outcomes: [
        '能用三条标准判断函数在某点是否连续',
        '会找间断点，区分可去间断与跳跃、无穷等不可去间断',
        '理解连续函数的四则运算与复合性质',
        '会用介值定理与最值定理解决存在性与最值问题',
      ],
      topics: [
        {
          id: 'p3c2t1',
          title: '连续的定义与判断',
          objective: '能用三条标准判断函数在某点是否连续',
          minutes: 16,
          blocks: {
            background: [
              {
                title: '从「一笔画」到严格标准',
                text: '直觉上，连续函数的图像能一笔画成、笔尖不离纸面。但数学需要可操作的检查标准。教材 5.1 节把「不断笔」翻译成三个可以逐条验证的条件，这就是我们判断连续性的标尺。',
              },
            ],
            plain: [
              {
                title: '连续性把「附近」和「在」接起来',
                text: '极限只关心 $x=a$ 附近发生什么，压根不管 $a$ 处本身。可很多时候我们希望「附近的趋势」正好落到「这一点的值」上，比如知道 $x$ 接近 2 时 $f(x)$ 接近 9，就想知道 $f(2)$ 是不是真的等于 9。连续就是保证这件事成立的桥梁，教材 5.1 节的原话是：连续性把「附近的」与「在」联系了起来。',
              },
            ],
            definition: [
              {
                title: '在一点连续的三条件（教材 5.1.1）',
                text: '函数 $f$ 在 $x=a$ 处连续，当且仅当同时满足：① $\\lim_{x\\to a}f(x)$ 存在且有限；② $f(a)$ 存在且有限；③ $\\lim_{x\\to a}f(x)=f(a)$。三句话合起来就是那句熟悉的 $\\lim_{x\\to a}f(x)=f(a)$。',
              },
              {
                title: '在区间上连续',
                text: '若 $f$ 在开区间 $(a,b)$ 内每一点都连续，就说它在 $(a,b)$ 上连续。闭区间 $[a,b]$ 上还要求端点处单侧连续：在 $a$ 处右连续（$\\lim_{x\\to a^+}f(x)=f(a)$），在 $b$ 处左连续（$\\lim_{x\\to b^-}f(x)=f(b)$）。若 $f$ 在定义域每点都连续，就称它是连续函数。',
              },
            ],
            symbols: [
              {
                title: '一句话里的三层意思',
                text: '$\\lim_{x\\to a}f(x)=f(a)$ 这只等式看着简单，其实藏了三件事：左边的极限得存在、右边的函数值得存在、两边还得相等。任何一条出问题，等号就不成立，函数在这一点就不连续。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: '(x^2-1)/(x-1)',
              params: { target: 1 },
              caption: '观察 $\\frac{x^2-1}{x-1}$：在 $x=1$ 处有空心点（函数无定义），但极限是 2。若补上 $f(1)=2$，函数就在该点连续了。',
            },
            keyFormulas: [
              { latex: '\\lim_{x\\to a}f(x)=f(a)', meaning: '连续的等价定义：极限值等于函数值', note: '隐含三条：极限存在、函数值存在、两者相等', display: 'block' },
              { latex: '\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=f(a)', meaning: '用单侧极限表述的连续性', note: '分段函数的分界点常用这条' },
            ],
            examplesBasic: [
              {
                title: '验证多项式连续',
                level: 'basic',
                asking: '判断 $f(x)=x^2$ 在 $x=2$ 处是否连续。',
                given: ['$f(x)=x^2$', '考察点 $a=2$'],
                method: ['连续三条件逐一验证'],
                steps: [
                  { action: '查条件① 极限存在', latex: '$\\lim_{x\\to2}x^2=4$，存在且有限', why: '多项式可直接代入。' },
                  { action: '查条件② 函数值存在', latex: '$f(2)=2^2=4$，存在且有限', why: '$x^2$ 在 $x=2$ 有定义。' },
                  { action: '查条件③ 两者相等', latex: '$4=4$，相等', why: '极限值正好等于函数值。' },
                ],
                result: '三条都满足，$f(x)=x^2$ 在 $x=2$ 处连续。',
                check: '图像是一条光滑抛物线，经过 $(2,4)$，没有断笔✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '判断分段函数在分界点的连续性',
                level: 'advanced',
                asking: '设 $f(x)=\\begin{cases}x+1,&x<1\\\\2,&x=1\\\\3-x,&x>1\\end{cases}$，判断它在 $x=1$ 处是否连续。',
                given: ['$x<1$ 时 $f(x)=x+1$', '$x=1$ 时 $f(1)=2$', '$x>1$ 时 $f(x)=3-x$'],
                method: ['分界点要用左右极限', '验证连续三条件'],
                steps: [
                  { action: '左极限', latex: '$\\lim_{x\\to1^-}f(x)=\\lim_{x\\to1^-}(x+1)=2$', why: '左侧用第一段 $x+1$。' },
                  { action: '右极限', latex: '$\\lim_{x\\to1^+}f(x)=\\lim_{x\\to1^+}(3-x)=2$', why: '右侧用第三段 $3-x$。' },
                  { action: '极限存在', latex: '左右极限都是 2，故 $\\lim_{x\\to1}f(x)=2$', why: '左右相等，双侧极限存在。' },
                  { action: '函数值', latex: '$f(1)=2$', why: '由第二段直接给出。' },
                  { action: '比较', latex: '$\\lim_{x\\to1}f(x)=2=f(1)$', why: '极限值等于函数值，三条件全满足。' },
                ],
                result: '$f$ 在 $x=1$ 处连续。',
                check: '左段趋近高度 2，右段也趋近高度 2，且该点函数值正好是 2，图像在此处接得上✓。',
                pitfall: '分段点必须同时查左右极限，只看一边会漏判。',
              },
            ],
            mistakes: [
              { title: '只满足两条就下结论', text: '极限存在、函数值也存在，但两者不相等时仍然不连续。三条缺一不可。' },
              { title: '端点用双侧极限', text: '闭区间端点只能用单侧极限判断连续性，硬套双侧极限会误判。' },
            ],
            summary: [
              { text: '连续的三条件：极限存在、函数值存在、两者相等。分段函数的分界点要用左右极限替代双侧极限。连续性把「附近」和「在」接起来，让「直接代入求极限」有了依据。' },
            ],
          },
        },
        {
          id: 'p3c2t2',
          title: '间断点及其分类',
          objective: '会找间断点，区分可去间断与跳跃、无穷等不可去间断',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '三条标准里哪条坏了',
                text: '在一点连续要同时满足三条件。只要有一条不满足，那一点就是间断点。教材 5.1.1 节的图 5-1 画出了三种典型的「坏法」，对应我们下面要学的间断类型。',
              },
            ],
            plain: [
              {
                title: '三种「断笔」的样子',
                text: '可去间断像图像上被挖掉的一个洞，只要把洞补上（或补对位置）就连续了；跳跃间断像台阶，左右两边接不上；无穷间断像一道深深的裂缝，函数值在这里冲向无穷。前一种可以补救，后几种没救，所以分成了可去与不可去两大类。',
              },
            ],
            definition: [
              {
                title: '间断点',
                text: '若 $f$ 在 $x=a$ 处不满足连续三条件中的任意一条，就称 $a$ 是 $f$ 的间断点（不连续点）。讨论间断点时通常要求 $f$ 在 $a$ 的某去心邻域内有定义。',
              },
              {
                title: '可去间断',
                text: '若 $\\lim_{x\\to a}f(x)$ 存在且有限，但 $f(a)$ 无定义，或者 $f(a)$ 存在却不等于该极限，则称 $a$ 为可去间断点。只要补充或修改 $f(a)$ 的定义让它等于极限，函数就在 $a$ 处连续。',
              },
              {
                title: '不可去间断：跳跃、无穷、振荡',
                text: '若左右极限都存在但不相等，叫跳跃间断（台阶式）；若某侧极限为 $\\pm\\infty$，叫无穷间断（对应垂直渐近线）；若函数值无限振荡而没有极限（如 $x\\to0$ 时的 $\\sin\\frac1x$，教材 3.3、3.7 节），叫振荡间断。这几类都无法靠补一个点救回来。',
              },
            ],
            symbols: [
              {
                title: '可去的关键判据',
                text: '记住一句话：极限存在且有限，对应可去；极限不存在（或为无穷），对应不可去。判断时先算 $\\lim_{x\\to a}f(x)$，再对照这条判据。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: '1/x',
              params: { target: 0 },
              caption: '在 $x=0$ 处，$\\frac1x$ 的左极限是 $-\\infty$、右极限是 $+\\infty$，属于不可去的无穷间断——这里 $x=0$ 是垂直渐近线。',
            },
            keyFormulas: [
              { latex: '\\lim_{x\\to a}f(x)\\ \\text{存在且有限}\\Rightarrow a\\ \\text{是可去间断点（若它不连续）}', meaning: '可去间断的判据', note: '补上 $f(a)=\\lim_{x\\to a}f(x)$ 即可连续' },
              { latex: '\\lim_{x\\to a^-}f(x)\\neq\\lim_{x\\to a^+}f(x)\\Rightarrow a\\ \\text{是跳跃间断点}', meaning: '左右极限不等就是跳跃', note: '两侧极限都存在但不相等' },
            ],
            examplesBasic: [
              {
                title: '识别可去间断点',
                level: 'basic',
                asking: '说明 $f(x)=\\frac{x^2-1}{x-1}$ 在 $x=1$ 处的间断类型，并给出让它连续的办法。',
                given: ['$f(x)=\\frac{x^2-1}{x-1}$，$x\\neq1$'],
                method: ['先求 $x\\to1$ 的极限', '再按可去/不可去判据分类'],
                steps: [
                  { action: '查函数值', latex: '$f(1)$ 无定义（分母为 0）', why: '三条件的第②条不满足，所以 $x=1$ 是间断点。' },
                  { action: '求极限', latex: '$\\frac{x^2-1}{x-1}=x+1\\ (x\\neq1)$，故 $\\lim_{x\\to1}f(x)=2$', why: '因式分解约分后代入。' },
                  { action: '判类型', latex: '极限存在且有限（等于 2），但 $f(1)$ 无定义', why: '符合可去间断的定义。' },
                  { action: '补救', latex: '补充定义 $f(1)=2$', why: '让函数值等于极限值，三条件就都满足了。' },
                ],
                result: '$x=1$ 是可去间断点；补上 $f(1)=2$ 后函数在 $x=1$ 连续。',
                check: '补完后图像上的空心点被填实，曲线连成一条✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '识别跳跃间断点',
                level: 'advanced',
                asking: '判断 $f(x)=\\begin{cases}x,&x<0\\\\x+1,&x\\ge0\\end{cases}$ 在 $x=0$ 处的间断类型。',
                given: ['$x<0$ 时 $f(x)=x$', '$x\\ge0$ 时 $f(x)=x+1$'],
                method: ['求左右极限并比较', '按判据分类'],
                steps: [
                  { action: '左极限', latex: '$\\lim_{x\\to0^-}f(x)=\\lim_{x\\to0^-}x=0$', why: '左侧用第一段。' },
                  { action: '右极限', latex: '$\\lim_{x\\to0^+}f(x)=\\lim_{x\\to0^+}(x+1)=1$', why: '右侧用第二段。' },
                  { action: '比较', latex: '$0\\neq1$，左右极限都存在但不相等', why: '双侧极限不存在。' },
                  { action: '判类型', latex: '左右极限都存在却不相等 ⇒ 跳跃间断点', why: '符合跳跃间断的定义，无法靠补一个点救回。' },
                ],
                result: '$x=0$ 是跳跃间断点（不可去）。',
                check: '图像在 $x=0$ 处从高度 0 直接跳到高度 1，像一级台阶✓。',
                pitfall: '跳跃间断两侧极限都存在，别和「极限不存在」混为一谈——这里双侧极限确实不存在，但两侧单侧极限都存在。',
              },
            ],
            mistakes: [
              { title: '函数值不存在就以为极限不存在', text: '可去间断里 $f(a)$ 可以无定义，但只要极限存在，它仍然是可去的。' },
              { title: '把所有「极限不存在」都归成一类', text: '左右极限不等是跳跃，一侧冲向无穷是无穷间断，来回震荡是振荡间断，它们的成因不同。' },
            ],
            summary: [
              { text: '间断点按「极限能不能救」分类：极限存在且有限是可去间断，补一个点即可；左右极限不等是跳跃，一侧趋于无穷是无穷间断，来回震荡是振荡间断，这些都无法补救。判断时先算极限，再对照判据。' },
            ],
          },
        },
        {
          id: 'p3c2t3',
          title: '连续函数的性质',
          objective: '会用连续函数的运算与复合性质，理解并应用介值定理与最值定理',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '为什么要看整体性质',
                text: '知道一个函数连续，能带来超出「图像不断」的实用结论：方程有没有解、函数在区间上有没有最大最小值。教材 5.1 节紧接连续性介绍了介值定理与最值定理，它们正是解方程和研究最值的理论基础。',
              },
            ],
            plain: [
              {
                title: '爬山与拍照',
                text: '介值定理像爬山：你从海拔 100 米走到 300 米，只要路是连续的，途中必然经过 200 米，中间的海拔一个都跳不过去。最值定理像给一段连续的曲线拍照：只要区间是闭的、曲线不断，照片里一定有最高点和最低点。',
              },
            ],
            definition: [
              {
                title: '连续函数的运算性质（教材 5.1.3）',
                text: '连续函数的和、差、积、商（分母不为 0 处）与复合仍然是连续函数。由此可得：所有多项式处处连续；有理函数在分母不为 0 处连续；指数函数、对数函数（定义域内）、三角函数（渐近线之外）都连续。',
              },
              {
                title: '介值定理（IVT，教材 5.1 节）',
                text: '若 $f$ 在闭区间 $[a,b]$ 上连续，且 $f(a)$ 与 $f(b)$ 异号（一正一负），则至少存在一点 $c\\in(a,b)$ 使 $f(c)=0$。更一般地，$f$ 会取到 $f(a)$ 与 $f(b)$ 之间的每一个值。',
              },
              {
                title: '最值定理（EVT，教材 5.1 节）',
                text: '若 $f$ 在闭区间 $[a,b]$ 上连续，则 $f$ 在 $[a,b]$ 上一定能取到最大值和最小值。',
              },
            ],
            symbols: [
              {
                title: '闭区间是关键',
                text: '最值定理里「闭区间」三个字不能丢。开区间就不一定有最值，比如 $f(x)=\\frac1x$ 在 $(0,1)$ 上连续，但它往上冲到无穷、往下又取不到 0，既没最大也没最小。',
              },
            ],
            figure: {
              kind: 'function',
              initialFn: 'x^3-2',
              caption: '观察 $f(x)=x^3-2$：$f(1)=-1<0$，$f(2)=6>0$，图像连续地从负值穿到正值。介值定理保证中间必有一个零点（即 $\\sqrt[3]{2}$）。',
            },
            keyFormulas: [
              { latex: 'f(a)\\cdot f(b)<0\\ \\text{且}\ f\\ \\text{在}[a,b]\\text{连续}\\Rightarrow\\exists c\\in(a,b),f(c)=0', meaning: '介值定理的零点版本：端点异号则区间内有零点', display: 'block' },
              { latex: 'f\\ \\text{在}[a,b]\\text{连续}\\Rightarrow f\\ \\text{在}[a,b]\\text{有最大值与最小值}', meaning: '最值定理：闭区间上的连续函数必有最值', display: 'block' },
            ],
            examplesBasic: [
              {
                title: '用介值定理找根',
                level: 'basic',
                asking: '证明方程 $x^3-x-1=0$ 在区间 $(1,2)$ 内至少有一个根。',
                given: ['$f(x)=x^3-x-1$', '考察区间 $[1,2]$'],
                method: ['多项式连续', '计算端点函数值符号', '套用介值定理'],
                steps: [
                  { action: '说明连续', latex: '$f(x)=x^3-x-1$ 是多项式，在 $[1,2]$ 上连续', why: '多项式处处连续，满足介值定理前提。' },
                  { action: '算左端点', latex: '$f(1)=1-1-1=-1<0$', why: '代入 $x=1$。' },
                  { action: '算右端点', latex: '$f(2)=8-2-1=5>0$', why: '代入 $x=2$。' },
                  { action: '套定理', latex: '$f(1)\\cdot f(2)<0$，故存在 $c\\in(1,2)$ 使 $f(c)=0$', why: '连续函数从负变正途中必过零点。' },
                ],
                result: '方程 $x^3-x-1=0$ 在 $(1,2)$ 内至少有一个实根。',
                check: '取值 $x=1.3$ 算得 $f\\approx-0.103$，$x=1.4$ 算得 $f\\approx0.344$，根确在 1.3～1.4 之间，落在 $(1,2)$ 内✓。',
                pitfall: '介值定理只保证「至少有一个」根，不保证唯一，也不告诉我们根的具体数值。',
              },
            ],
            examplesAdvanced: [
              {
                title: '用介值定理证明方程有解',
                level: 'advanced',
                asking: '证明方程 $\\cos x=x$ 在区间 $(0,\\frac{\\pi}{2})$ 内至少有一个解。',
                given: ['考察 $f(x)=\\cos x-x$', '区间 $[0,\\frac{\\pi}{2}]$'],
                method: ['把方程移项构造辅助函数', '验证连续与端点异号', '用介值定理'],
                steps: [
                  { action: '构造辅助函数', latex: '$f(x)=\\cos x-x$，方程的解就是 $f(x)=0$ 的根', why: '把 $\\cos x=x$ 移项变成求零点问题。' },
                  { action: '说明连续', latex: '$\\cos x$ 与 $x$ 都连续，故 $f$ 在 $[0,\\frac{\\pi}{2}]$ 上连续', why: '连续函数的差仍连续。' },
                  { action: '算左端点', latex: '$f(0)=\\cos0-0=1>0$', why: '$\\cos0=1$。' },
                  { action: '算右端点', latex: '$f(\\frac{\\pi}{2})=\\cos\\frac{\\pi}{2}-\\frac{\\pi}{2}=0-\\frac{\\pi}{2}<0$', why: '$\\cos\\frac{\\pi}{2}=0$，$\\frac{\\pi}{2}>0$。' },
                  { action: '套定理', latex: '$f(0)>0>f(\\frac{\\pi}{2})$，故存在 $c\\in(0,\\frac{\\pi}{2})$ 使 $f(c)=0$', why: '连续函数由正变负必过零点。' },
                ],
                result: '方程 $\\cos x=x$ 在 $(0,\\frac{\\pi}{2})$ 内至少有一个解。',
                check: '数值上这个解约为 $0.739$（弧度），确实落在 $(0,1.571)$ 内✓。',
              },
            ],
            application: [
              {
                title: '介值定理的现实影子',
                text: '海拔、温度、血压这类连续变化的量，中间值一个都跳不过去。医生知道你早晨和傍晚的血压，就能推断中间某个时刻必然取到两者之间的数值。工程上用二分法求方程根，背后也是介值定理：每次取中点看符号，不断把有根区间缩小一半。',
              },
            ],
            mistakes: [
              { title: '忘记闭区间前提', text: '最值定理要求 $[a,b]$ 是闭区间。开区间或无界区间上连续的函数可能没有最值。' },
              { title: '端点同号就断言无根', text: '端点同号时介值定理帮不上忙，但区间内仍可能有根（曲线可能先降后升穿过 x 轴再回来）。定理给的是充分条件。' },
            ],
            summary: [
              { text: '连续函数的和差积商与复合仍连续，多项式、有理函数、指数对数三角都在各自定义域内连续。介值定理（端点异号则有零点）和最值定理（闭区间连续则有最值）是连续性最实用的两个结论，注意它们的前提条件。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第三章 极限的计算技巧 ============================ */
    {
      id: 'p3c3',
      number: 3,
      title: '极限的计算技巧',
      intro:
        '前面学了极限是什么、怎么算，这一章专门打磨「算」的手艺。$0/0$ 型极限千变万化，但背后的招式就那么几套：因式分解、有理化、通分、特殊极限和夹逼定理。学会先辨认类型再选工具，你就能从容应对绝大多数极限题。',
      outcomes: [
        '会用因式分解与约分处理多项式型的 0/0 极限',
        '会用有理化和通分处理根式与分式相减的极限',
        '记住两个特殊极限，会用夹逼定理处理振荡有界的极限',
        '面对一个极限能判断类型并选对方法',
      ],
      topics: [
        {
          id: 'p3c3t1',
          title: '因式分解与约分',
          objective: '会用因式分解与约分处理 0/0 型极限',
          minutes: 15,
          blocks: {
            background: [
              {
                title: '0/0 里的「零因子」',
                text: '把 $a$ 代入得到 $\\frac00$，往往是因为分子分母都含有同一个在 $a$ 处等于零的因子 $(x-a)$。只要把这个公共因子找出来约掉，分式在 $a$ 附近就变成了一个可以直接代入的式子。',
              },
            ],
            plain: [
              {
                title: '把制造零的「坏因子」揪出来',
                text: '因式分解就是把和式拆成乘积。拆成乘积后，那个让分子分母同时变成 0 的 $(x-a)$ 就暴露出来了，可以像约分分数一样约掉。求极限时允许这样做，因为我们只看 $x$ 靠近 $a$、但始终不等于 $a$ 时的情形。',
              },
            ],
            definition: [
              {
                title: '做法的依据',
                text: '若在 $x\\neq a$ 时 $f(x)=g(x)$（两者只差一个可约因子），则 $\\lim_{x\\to a}f(x)=\\lim_{x\\to a}g(x)$，因为极限只依赖 $a$ 附近（不含 $a$）的取值。',
              },
            ],
            keyFormulas: [
              { latex: 'x^2-b^2=(x-b)(x+b)', meaning: '平方差：分解后常能约去 $(x-b)$', display: 'block' },
              { latex: 'x^3-b^3=(x-b)(x^2+bx+b^2)', meaning: '立方差：处理 $x^3-b^3$ 型 0/0', display: 'block' },
              { latex: '\\frac{(x-a)g(x)}{(x-a)h(x)}=\\frac{g(x)}{h(x)}\\quad(x\\neq a)', meaning: '约去公共零因子后再求极限', display: 'block' },
            ],
            figure: {
              kind: 'limit',
              initialFn: '(x^2-4)/(x-2)',
              params: { target: 2 },
              caption: '图像在 $x=2$ 处有个小洞（原式无定义），但约分后就是 $x+2$。拖动 $x$ 靠近 2，函数值趋向 4——这就是约分后的极限。',
            },
            examplesBasic: [
              {
                title: '平方差约分',
                level: 'basic',
                asking: '求 $\\lim_{x\\to2}\\frac{x^2-4}{x-2}$。',
                given: ['$\\frac{x^2-4}{x-2}$', '代入得 $\\frac00$'],
                method: ['平方差因式分解', '约分后代入'],
                steps: [
                  { action: '分解分子', latex: '$x^2-4=x^2-2^2=(x-2)(x+2)$', why: '平方差公式，$4=2^2$。' },
                  { action: '约分', latex: '$\\frac{(x-2)(x+2)}{x-2}=x+2\\quad(x\\neq2)$', why: '约去制造零的公共因子 $(x-2)$。' },
                  { action: '代入', latex: '$\\lim_{x\\to2}(x+2)=2+2=4$', why: '化简后可直接代入。' },
                ],
                result: '$\\lim_{x\\to2}\\frac{x^2-4}{x-2}=4$。',
                check: '取 $x=1.99$，原式 $=\\frac{1.99^2-4}{-0.01}\\approx3.99$，接近 4 ✓。',
                pitfall: '约分后得到 $x+2$ 仅在 $x\\neq2$ 时与原式相等，但这对求极限完全够用。',
              },
            ],
            examplesAdvanced: [
              {
                title: '立方差约分',
                level: 'advanced',
                asking: '求 $\\lim_{x\\to1}\\frac{x^3-1}{x-1}$。',
                given: ['$\\frac{x^3-1}{x-1}$', '代入得 $\\frac00$'],
                method: ['立方差因式分解', '约分后代入'],
                steps: [
                  { action: '分解分子', latex: '$x^3-1=x^3-1^3=(x-1)(x^2+x+1)$', why: '立方差公式 $a^3-b^3=(a-b)(a^2+ab+b^2)$。' },
                  { action: '约分', latex: '$\\frac{(x-1)(x^2+x+1)}{x-1}=x^2+x+1\\quad(x\\neq1)$', why: '约去 $(x-1)$。' },
                  { action: '代入', latex: '$\\lim_{x\\to1}(x^2+x+1)=1+1+1=3$', why: '多项式直接代入。' },
                ],
                result: '$\\lim_{x\\to1}\\frac{x^3-1}{x-1}=3$。',
                check: '取 $x=0.999$，$x^2+x+1\\approx2.997$，接近 3 ✓。',
                pitfall: '立方差展开后是 $x^2+x+1$，中间项是 $+x$，别漏掉。',
              },
            ],
            mistakes: [
              { title: '分解错公式', text: '$x^3-1=(x-1)(x^2+x+1)$，不是 $(x-1)(x^2-2x+1)$。写完分解记得展开验证。' },
              { title: '把 0/0 当成 0 或 1', text: '$0/0$ 是未定式，结果可能是任何数，必须化简后再算。' },
            ],
            summary: [
              { text: '遇到多项式型的 $0/0$，先把分子因式分解，找出与分母相同的零因子 $(x-a)$ 约掉，再代入。平方差与立方差是最常用的两个公式，分解完记得展开验证。' },
            ],
          },
        },
        {
          id: 'p3c3t2',
          title: '有理化与通分',
          objective: '会用有理化与通分处理根式型与分式相减型的极限',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '因式分解不够用的时候',
                text: '有些 $0/0$ 带着根号（如 $\\frac{\\sqrt{x}-1}{x-1}$），没法直接因式分解；还有些是两个分式相减（如 $\\frac1{x-1}-\\frac2{x^2-1}$），代入各自都没问题但合起来才是待定式。这两类各有专门招式：有理化和通分。',
              },
            ],
            plain: [
              {
                title: '配对搭桥与汇流成河',
                text: '有理化就是给根式找个伴，分子分母同乘它的共轭式，$(\\sqrt{u}-\\sqrt{v})(\\sqrt{u}+\\sqrt{v})=u-v$，根号就消掉了。通分就是把相减的分式汇成一条河，用公分母合并成一个分式，往往就能约分了。',
              },
            ],
            definition: [
              {
                title: '有理化',
                text: '对含 $\\sqrt{u}-\\sqrt{v}$ 的式子，分子分母同乘 $\\sqrt{u}+\\sqrt{v}$，利用平方差 $(\\sqrt{u})^2-(\\sqrt{v})^2=u-v$ 消去根号。乘完别忘了约去制造零的因子。',
              },
              {
                title: '通分',
                text: '对 $\\frac{A}{B}-\\frac{C}{D}$，先找公分母 $BD$，合并为 $\\frac{AD-CB}{BD}$，再对分子因式分解、约分。',
              },
            ],
            symbols: [
              {
                title: '共轭式',
                text: '$\\sqrt{a}-\\sqrt{b}$ 与 $\\sqrt{a}+\\sqrt{b}$ 互为共轭式，它们相乘正好消掉根号。选共轭式时只看中间符号相反，平方后根号就没了。',
              },
            ],
            keyFormulas: [
              { latex: '(\\sqrt{a}-\\sqrt{b})(\\sqrt{a}+\\sqrt{b})=a-b', meaning: '共轭相乘消根号', note: '要求 $a,b\\ge0$ 才有实数意义', display: 'block' },
              { latex: '\\frac{A}{B}-\\frac{C}{D}=\\frac{AD-CB}{BD}', meaning: '通分合并两个分式', display: 'block' },
            ],
            figure: {
              kind: 'limit',
              initialFn: '(sqrt(x)-1)/(x-1)',
              params: { target: 1 },
              caption: '原式在 $x=1$ 处是 $0/0$。分子分母同乘 $\\sqrt{x}+1$ 有理化后变成 $\\frac{1}{\\sqrt{x}+1}$，拖动 $x$ 靠近 1 可见极限为 $\\frac12$。',
            },
            examplesBasic: [
              {
                title: '有理化求极限',
                level: 'basic',
                asking: '求 $\\lim_{x\\to1}\\frac{\\sqrt{x}-1}{x-1}$。',
                given: ['$\\frac{\\sqrt{x}-1}{x-1}$', '代入得 $\\frac00$'],
                method: ['分子有理化：同乘共轭式 $\\sqrt{x}+1$', '约分后代入'],
                steps: [
                  { action: '同乘共轭式', latex: '$\\frac{\\sqrt{x}-1}{x-1}\\cdot\\frac{\\sqrt{x}+1}{\\sqrt{x}+1}$', why: '乘 1 不改变原式，但能消掉分子根号。' },
                  { action: '化简分子', latex: '$(\\sqrt{x}-1)(\\sqrt{x}+1)=x-1$', why: '平方差公式，根号消失。' },
                  { action: '约分', latex: '$\\frac{x-1}{(x-1)(\\sqrt{x}+1)}=\\frac{1}{\\sqrt{x}+1}\\quad(x\\neq1)$', why: '约去公共零因子 $(x-1)$。' },
                  { action: '代入', latex: '$\\lim_{x\\to1}\\frac{1}{\\sqrt{x}+1}=\\frac{1}{1+1}=\\frac12$', why: '化简后可直接代入。' },
                ],
                result: '$\\lim_{x\\to1}\\frac{\\sqrt{x}-1}{x-1}=\\frac12$。',
                check: '数值验证：取 $x=1.01$，$\\frac{\\sqrt{1.01}-1}{0.01}\\approx0.499$，接近 0.5 ✓。',
                pitfall: '有理化后一定要约去 $(x-1)$，否则代入仍是 $0/0$。',
              },
            ],
            examplesAdvanced: [
              {
                title: '通分求极限',
                level: 'advanced',
                asking: '求 $\\lim_{x\\to1}\\left(\\frac{1}{x-1}-\\frac{2}{x^2-1}\\right)$。',
                given: ['两个分式相减', '代入 $x=1$ 各自趋于无穷，合起来才是待定式'],
                method: ['先通分合并', '因式分解分子并约分', '再代入'],
                steps: [
                  { action: '注意分母关系', latex: '$x^2-1=(x-1)(x+1)$', why: '公分母就是 $x^2-1$。' },
                  { action: '通分', latex: '$\\frac{1}{x-1}-\\frac{2}{(x-1)(x+1)}=\\frac{x+1-2}{(x-1)(x+1)}$', why: '第一项分子乘 $(x+1)$，第二项保持。' },
                  { action: '化简分子', latex: '$\\frac{x-1}{(x-1)(x+1)}$', why: '$x+1-2=x-1$。' },
                  { action: '约分', latex: '$=\\frac{1}{x+1}\\quad(x\\neq1)$', why: '约去 $(x-1)$。' },
                  { action: '代入', latex: '$\\lim_{x\\to1}\\frac{1}{x+1}=\\frac12$', why: '可直接代入。' },
                ],
                result: '$\\lim_{x\\to1}\\left(\\frac{1}{x-1}-\\frac{2}{x^2-1}\\right)=\\frac12$。',
                check: '取 $x=1.01$，第一项约 $100$，第二项约 $\\frac{2}{0.0201}\\approx99.5$，差约 $0.5$ ✓。',
                pitfall: '别一开始就分别代入，两个无穷大相减没有意义，必须先合并成一个分式。',
              },
            ],
            mistakes: [
              { title: '忘记约分', text: '有理化或通分后，往往还要约去 $(x-a)$ 才能代入。少这一步就会再得到 $0/0$。' },
              { title: '选错共轭式', text: '$\\sqrt{x}+1$ 的共轭是 $\\sqrt{x}-1$。乘的时候分子分母都要乘同一个式子。' },
            ],
            summary: [
              { text: '根式型的 $0/0$ 用有理化（同乘共轭式消根号），分式相减型的待定式用通分（合并后因式分解再约分）。两招的共同收尾都是约去零因子，然后代入。' },
            ],
          },
        },
        {
          id: 'p3c3t3',
          title: '特殊极限与夹逼定理',
          objective: '记住两个特殊极限，会用夹逼定理求振荡有界型极限',
          minutes: 20,
          blocks: {
            background: [
              {
                title: '代数招式也有够不着的地方',
                text: '像 $\\frac{\\sin x}{x}$（$x\\to0$）或 $x\\sin\\frac1x$ 这样的极限，因式分解和有理化都使不上劲。前者需要记住一个特殊极限，后者需要一个新的思想：把函数夹在两个更容易求极限的函数之间。教材 3.6 节把这个思想叫做三明治定理，也叫夹逼定理。',
              },
            ],
            plain: [
              {
                title: '三明治与有界的小兄弟',
                text: '夹逼定理像做三明治：如果你能把目标函数 $f$ 夹在上下两片面包 $g$ 和 $h$ 之间（$g\\le f\\le h$），而两片面包在 $x\\to a$ 时都趋向同一个值 $L$，那么中间的馅 $f$ 被挤得无处可去，也只能趋向 $L$。正弦、余弦这类有界函数（值永远在 $-1$ 和 $1$ 之间）常用来当馅。',
              },
            ],
            definition: [
              {
                title: '两个特殊极限',
                text: '$\\lim_{x\\to0}\\frac{\\sin x}{x}=1$，$\\lim_{x\\to0}\\frac{1-\\cos x}{x}=0$（等价地 $\\lim_{x\\to0}\\frac{\\tan x}{x}=1$）。另外，教材第一篇定义自然常数时用过 $\\lim_{n\\to\\infty}(1+\\frac1n)^n=e$。这几个极限是基本事实，要记住。$\\frac{\\sin x}{x}\\to1$ 只在 $x\\to0$ 时成立，$x\\to\\infty$ 时该极限不存在（函数在振荡）。',
              },
              {
                title: '夹逼（三明治）定理（教材 3.6 节）',
                text: '若在 $a$ 附近（或 $a$ 的某一侧，或 $x$ 充分大时）有 $g(x)\\le f(x)\\le h(x)$，且 $\\lim g=\\lim h=L$，则 $\\lim f=L$。单侧极限与 $x\\to\\infty$ 都有对应版本。',
              },
            ],
            symbols: [
              {
                title: '有界性是关键',
                text: '$|\\sin(\\text{任意})|\\le1$、$|\\cos(\\text{任意})|\\le1$ 是夹逼定理最常用的馅料。乘上一个趋于 0 的因子（如 $x^2$），整个式子就被夹在 $\\pm x^2$ 之间，被迫趋于 0。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: 'sin(x)/x',
              params: { target: 0 },
              caption: '教材用夹逼定理证明 $\\frac{\\sin x}{x}\\to1$：当 $0<x<\\frac\\pi2$ 时 $\\cos x<\\frac{\\sin x}{x}<1$，而 $\\cos x$ 和 $1$ 都趋向 1，把 $\\frac{\\sin x}{x}$ 夹在中间。',
            },
            keyFormulas: [
              { latex: '\\lim_{x\\to0}\\frac{\\sin x}{x}=1', meaning: '最重要的特殊极限（x 用弧度）', note: '仅在 x→0 成立' },
              { latex: '\\lim_{x\\to0}\\frac{1-\\cos x}{x}=0', meaning: '常用特殊极限', note: '常配合通分或有理化使用' },
              { latex: 'g(x)\\le f(x)\\le h(x),\\ \\lim g=\\lim h=L\\Rightarrow\\lim f=L', meaning: '夹逼定理：被夹住的函数趋向同一个值', note: '不等式只需在 a 附近（或某侧）成立', display: 'block' },
            ],
            derivation: {
              intro: '用夹逼定理求 $\\lim_{x\\to0}x\\sin\\frac1x$（教材 5.1.3 节）：',
              steps: [
                { action: '用正弦的有界性', latex: '$-1\\le\\sin\\frac1x\\le1$', why: '任意角的正弦都在 $-1$ 和 $1$ 之间。' },
                { action: '同乘 $|x|$', latex: '$-|x|\\le x\\sin\\frac1x\\le|x|$', why: '乘以非负的 $|x|$ 不改变不等号方向，且 $x\\sin(\\cdot)$ 的绝对值不超过 $|x|$。' },
                { action: '两边取极限', latex: '$\\lim_{x\\to0}(-|x|)=0,\\ \\lim_{x\\to0}|x|=0$', why: '上下两片面包都趋于 0。' },
                { action: '夹逼得结论', latex: '$\\lim_{x\\to0}x\\sin\\frac1x=0$', why: '中间的 $f$ 被夹在都趋于 0 的两个函数之间。' },
              ],
              conclusion: '这就是夹逼的威力：哪怕 $\\sin\\frac1x$ 在 0 附近疯狂振荡，乘上趋于 0 的 $x$ 后整体仍趋于 0。',
            },
            examplesBasic: [
              {
                title: '用特殊极限 sin x/x',
                level: 'basic',
                asking: '求 $\\lim_{x\\to0}\\frac{\\sin 3x}{x}$。',
                given: ['$\\frac{\\sin 3x}{x}$', '已知 $\\lim_{u\\to0}\\frac{\\sin u}{u}=1$'],
                method: ['换元凑出 $\\frac{\\sin u}{u}$ 的形式'],
                steps: [
                  { action: '凑形式', latex: '$\\frac{\\sin3x}{x}=3\\cdot\\frac{\\sin3x}{3x}$', why: '分子分母同乘 3，使分母变成和分子角度一样的 $3x$。' },
                  { action: '换元', latex: '令 $u=3x$，则 $x\\to0$ 时 $u\\to0$', why: '把问题化为已知的特殊极限。' },
                  { action: '求极限', latex: '$\\lim_{x\\to0}3\\cdot\\frac{\\sin3x}{3x}=3\\lim_{u\\to0}\\frac{\\sin u}{u}=3\\cdot1=3$', why: '套用 $\\frac{\\sin u}{u}\\to1$。' },
                ],
                result: '$\\lim_{x\\to0}\\frac{\\sin3x}{x}=3$。',
                check: '一般地 $\\lim_{x\\to0}\\frac{\\sin kx}{x}=k$，这里 $k=3$ ✓。',
                pitfall: '必须凑成正弦的角度和分母完全一致才能套公式，$\\frac{\\sin3x}{x}$ 不能直接等于 1。',
              },
            ],
            examplesAdvanced: [
              {
                title: '用夹逼定理求振荡极限',
                level: 'advanced',
                asking: '求 $\\lim_{x\\to0}x^2\\cos\\frac1x$。',
                given: ['$x^2\\cos\\frac1x$', '$\\cos$ 有界：$|\\cos(\\cdot)|\\le1$'],
                method: ['用有界性建立不等式', '夹逼定理'],
                steps: [
                  { action: '用余弦有界', latex: '$-1\\le\\cos\\frac1x\\le1$', why: '任意角的余弦都在 $-1$ 和 $1$ 之间。' },
                  { action: '同乘 $x^2$', latex: '$-x^2\\le x^2\\cos\\frac1x\\le x^2$', why: '$x^2\\ge0$，乘非负数不改变不等号方向。' },
                  { action: '两边求极限', latex: '$\\lim_{x\\to0}(-x^2)=0,\\ \\lim_{x\\to0}x^2=0$', why: '两侧都趋于 0。' },
                  { action: '夹逼', latex: '$\\lim_{x\\to0}x^2\\cos\\frac1x=0$', why: '目标函数被夹在两个都趋于 0 的函数之间。' },
                ],
                result: '$\\lim_{x\\to0}x^2\\cos\\frac1x=0$。',
                check: '取 $x=0.01$，$|x^2\\cos(100)|\\le0.0001$，确实非常接近 0 ✓。',
                pitfall: '如果乘的是常数 1 而不是 $x^2$，$\\cos\\frac1x$ 在 0 附近无限振荡，极限就不存在，夹逼要求两侧极限相等。',
              },
            ],
            ai: [
              {
                title: '极限与 AI 的数值计算',
                text: '机器学习里计算梯度用的是差分商的极限：让步长 $h$ 趋于 0，$\\frac{f(x+h)-f(x)}{h}$ 才逼近导数。计算机里 $h$ 不能真的取 0（会除以 0），取太小又会有舍入误差，工程师正是在「极限的理想」和「数值的现实」之间找平衡。夹逼定理的思想也出现在数值算法的误差界分析里。',
              },
            ],
            mistakes: [
              { title: '乱套 sin x/x', text: '$\\frac{\\sin x}{x}\\to1$ 是 $x\\to0$ 时的结论，且要求角度和分母一致。$\\lim_{x\\to\\infty}\\frac{\\sin x}{x}$ 用的是夹逼（趋于 0），结果是 0。' },
              { title: '夹逼两边极限不等', text: '若 $g$ 和 $h$ 趋向不同的值，夹不住，定理不能用。' },
            ],
            summary: [
              { text: '记住 $\\frac{\\sin x}{x}\\to1$、$\\frac{1-\\cos x}{x}\\to0$（$x\\to0$）；遇到有界函数乘无穷小（如 $x^2\\cos\\frac1x$），用正弦余弦的 $|\\cdot|\\le1$ 建立夹逼不等式，两侧同趋于一个值即可得出结论。' },
            ],
          },
        },
        {
          id: 'p3c3t4',
          title: '极限综合练习',
          objective: '面对一个极限能判断类型并选对方法',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '工具箱齐了，学着挑工具',
                text: '因式分解、有理化、通分、特殊极限、夹逼、最高次项法，招式都学过了。真正做题时，关键的第一步是辨认题目属于哪种类型，然后选对工具。这一节把决策过程固化成一套流程。',
              },
            ],
            plain: [
              {
                title: '先诊断，再下药',
                text: '拿到一个极限，先老老实实代入一次。代入得到一个确定的数，直接结束；得到 $\\frac00$ 就开始找零因子（因式分解、有理化、通分、特殊极限）；得到 $\\frac{\\infty}{\\infty}$ 且是 $x\\to\\infty$，就同除最高次；看到有界函数乘无穷小，就想夹逼；遇到分段点，就分左右。',
              },
            ],
            definition: [
              {
                title: '解题流程',
                text: '① 先代入试一试；② 若是 $\\frac00$：多项式用因式分解，含根号用有理化，分式相减用通分，含三角用特殊极限；③ 若是 $x\\to\\infty$ 的有理式：同除最高次幂；④ 有界量乘无穷小：夹逼定理；⑤ 分段函数在分界点：分别求左右极限再比较。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac00\\Rightarrow\\text{因式分解 / 有理化 / 通分 / 特殊极限}', meaning: '0/0 型的工具箱', note: '选哪种看式子的长相' },
              { latex: 'x\\to\\infty\\text{ 的有理式}\\Rightarrow\\text{同除最高次幂}', meaning: '无穷远处看最高次项' },
            ],
            examplesBasic: [
              {
                title: '综合：有理化',
                level: 'basic',
                asking: '求 $\\lim_{x\\to0}\\frac{\\sqrt{x+4}-2}{x}$。',
                given: ['$\\frac{\\sqrt{x+4}-2}{x}$', '代入得 $\\frac00$'],
                method: ['先代入诊断类型', '含根号选用有理化', '约分后代入'],
                steps: [
                  { action: '诊断', latex: '$\\frac{\\sqrt{4}-2}{0}=\\frac00$，是待定式', why: '先代入判断类型。' },
                  { action: '有理化', latex: '$\\frac{\\sqrt{x+4}-2}{x}\\cdot\\frac{\\sqrt{x+4}+2}{\\sqrt{x+4}+2}$', why: '含根号，同乘共轭式。' },
                  { action: '化简分子', latex: '$(\\sqrt{x+4})^2-2^2=(x+4)-4=x$', why: '平方差消根号。' },
                  { action: '约分', latex: '$\\frac{x}{x(\\sqrt{x+4}+2)}=\\frac{1}{\\sqrt{x+4}+2}\\quad(x\\neq0)$', why: '约去 $x$。' },
                  { action: '代入', latex: '$\\lim_{x\\to0}\\frac{1}{\\sqrt{x+4}+2}=\\frac{1}{2+2}=\\frac14$', why: '化简后代入。' },
                ],
                result: '$\\lim_{x\\to0}\\frac{\\sqrt{x+4}-2}{x}=\\frac14$。',
                check: '取 $x=0.001$，$\\sqrt{4.001}\\approx2.00025$，分子约 $0.00025$，除以 $0.001$ 得 $0.25$，接近 $\\frac14$ ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '综合：分子分母都分解',
                level: 'advanced',
                asking: '求 $\\lim_{x\\to1}\\frac{x^3-1}{x^2-1}$。',
                given: ['$\\frac{x^3-1}{x^2-1}$', '代入得 $\\frac00$'],
                method: ['诊断类型', '分子立方差、分母平方差都分解', '约分后代入'],
                steps: [
                  { action: '诊断', latex: '$\\frac{1-1}{1-1}=\\frac00$', why: '先代入确认是 $0/0$ 型。' },
                  { action: '分解分子', latex: '$x^3-1=(x-1)(x^2+x+1)$', why: '立方差公式。' },
                  { action: '分解分母', latex: '$x^2-1=(x-1)(x+1)$', why: '平方差公式。' },
                  { action: '约分', latex: '$\\frac{(x-1)(x^2+x+1)}{(x-1)(x+1)}=\\frac{x^2+x+1}{x+1}\\quad(x\\neq1)$', why: '约去公共因子 $(x-1)$。' },
                  { action: '代入', latex: '$\\lim_{x\\to1}\\frac{x^2+x+1}{x+1}=\\frac{1+1+1}{1+1}=\\frac32$', why: '化简后代入。' },
                ],
                result: '$\\lim_{x\\to1}\\frac{x^3-1}{x^2-1}=\\frac32$。',
                check: '取 $x=1.01$，$\\frac{1.01^3-1}{1.01^2-1}\\approx\\frac{0.0303}{0.0201}\\approx1.507$，接近 1.5 ✓。',
                pitfall: '分子分母要分别分解，别只分解一边就急着约分。',
              },
            ],
            mistakes: [
              { title: '不先代入就乱用方法', text: '拿到题先代入一次，很多题结果是有限的数，根本不用化简。盲目分解反而浪费时间。' },
              { title: '方法用错场景', text: '含根号优先有理化，分式相减优先通分，含三角优先特殊极限。选对工具能省很多力气。' },
            ],
            summary: [
              { text: '求极限的通用流程：先代入，再诊断类型，然后选工具。$0/0$ 看式子长相选因式分解、有理化、通分或特殊极限；$x\\to\\infty$ 同除最高次；有界乘无穷小用夹逼；分段点分左右。多练几道，辨认类型会越来越快。' },
            ],
          },
        },
      ],
    },
  ],
};
