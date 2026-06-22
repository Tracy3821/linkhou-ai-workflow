/* =====================================================
   灵猴机器人 — AI智能工作流平台  app.js
   ===================================================== */

// ===== DATA =====
const DB = {
  requirements: [
    { id:'REQ-2026-001', customer:'博众精工科技股份有限公司', type:'新产品开发', desc:'需要一套用于汽车零部件装配线的协作机器人系统，要求负载5kg，重复定位精度±0.02mm，集成视觉检测', budget:'80-120', timeline:'3-6个月', priority:'高', owner:'李明', status:'已转研发', createdAt:'2026-06-01', progress:65 },
    { id:'REQ-2026-002', customer:'四川众达精工科技有限公司', type:'系统集成', desc:'工厂自动化改造项目，需要将现有人工装配线改造为半自动化，集成6台协作机器人和MES系统', budget:'200-300', timeline:'6个月以上', priority:'高', owner:'王芳', status:'AI分析中', createdAt:'2026-06-05', progress:20 },
    { id:'REQ-2026-003', customer:'杭州启熵科技有限公司', type:'定制改造', desc:'现有工业机器人关节模组升级，提升重复定位精度至±0.01mm，增加力控功能', budget:'30-50', timeline:'1-3个月', priority:'中', owner:'张华', status:'方案待确认', createdAt:'2026-06-08', progress:45 },
    { id:'REQ-2026-004', customer:'河南众驰富联精工科技', type:'新产品开发', desc:'AMR移动机器人用于仓储物流，需要自主导航、避障、货架识别功能，日工作时长20小时', budget:'50-80', timeline:'3-6个月', priority:'中', owner:'陈敏', status:'待分析', createdAt:'2026-06-10', progress:5 },
    { id:'REQ-2026-005', customer:'苏州精密制造有限公司', type:'售后支持', desc:'已购协作机器人UR10e视觉系统故障，需要现场诊断和修复，同时升级视觉算法', budget:'5-10', timeline:'1个月内', priority:'高', owner:'李工', status:'已确认', createdAt:'2026-06-12', progress:80 },
    { id:'REQ-2026-006', customer:'深圳鹏城智能制造', type:'新产品开发', desc:'电子产品精密装配机器人，需要微米级精度，集成力觉传感器，适应柔性生产线', budget:'150-200', timeline:'6个月以上', priority:'高', owner:'王芳', status:'AI分析中', createdAt:'2026-06-13', progress:30 },
  ],

  rdTasks: {
    '需求分析': [
      { id:'RD-001', title:'协作机器人关节模组设计', customer:'博众精工', desc:'5kg负载，±0.02mm精度关节模组技术方案', owner:'张工', due:'2026-06-20', priority:'高' },
      { id:'RD-002', title:'AMR导航算法优化', customer:'河南众驰', desc:'SLAM算法优化，提升复杂环境导航精度', owner:'李工', due:'2026-06-25', priority:'中' },
    ],
    '方案设计': [
      { id:'RD-003', title:'视觉检测系统集成方案', customer:'博众精工', desc:'工业相机选型、标定方案、检测算法设计', owner:'陈工', due:'2026-06-18', priority:'高' },
      { id:'RD-004', title:'力控模块开发', customer:'杭州启熵', desc:'六维力传感器集成，力控算法开发', owner:'王工', due:'2026-06-22', priority:'中' },
    ],
    '打样制作': [
      { id:'RD-005', title:'关节模组样机制作', customer:'博众精工', desc:'第一版样机制作，关键零部件加工', owner:'赵工', due:'2026-06-30', priority:'高' },
    ],
    '测试验证': [
      { id:'RD-006', title:'协作机器人整机测试', customer:'苏州精密', desc:'精度测试、负载测试、安全功能验证', owner:'刘工', due:'2026-06-16', priority:'高' },
      { id:'RD-007', title:'视觉算法精度验证', customer:'苏州精密', desc:'在实际工况下验证视觉检测准确率', owner:'孙工', due:'2026-06-17', priority:'中' },
    ],
  },

  productTasks: {
    '待测试': [
      { id:'PRD-001', title:'UR10e协作机器人 v2.1', customer:'苏州精密', desc:'视觉系统升级版本，待功能测试', owner:'测试组', due:'2026-06-18', priority:'高' },
      { id:'PRD-002', title:'关节模组 JM-5000', customer:'博众精工', desc:'新型关节模组，待精度测试', owner:'测试组', due:'2026-06-25', priority:'高' },
    ],
    '测试中': [
      { id:'PRD-003', title:'AMR-200移动机器人', customer:'河南众驰', desc:'导航算法v3.0测试中，已完成60%', owner:'李工', due:'2026-06-20', priority:'中' },
    ],
    '待发布': [
      { id:'PRD-004', title:'视觉检测系统 VS-Pro', customer:'博众精工', desc:'通过所有测试，待正式发布', owner:'产品组', due:'2026-06-22', priority:'中' },
    ],
    '已发布': [
      { id:'PRD-005', title:'协作机器人控制器 CC-3000', customer:'通用', desc:'已正式发布，进入量产阶段', owner:'产品组', due:'2026-06-01', priority:'低' },
      { id:'PRD-006', title:'工业机器人整机 IR-6000', customer:'通用', desc:'稳定版本，持续迭代中', owner:'产品组', due:'2026-05-15', priority:'低' },
    ],
  },

  salesData: [
    { stage:'需求确认', color:'#F59E0B', amount:'¥380万', items:[
      { customer:'博众精工', product:'协作机器人系统', amount:'¥120万', prob:'85%' },
      { customer:'四川众达', product:'系统集成项目', amount:'¥260万', prob:'70%' },
    ]},
    { stage:'方案报价', color:'#0891B2', amount:'¥520万', items:[
      { customer:'杭州启熵', product:'关节模组升级', amount:'¥45万', prob:'90%' },
      { customer:'深圳鹏城', product:'精密装配机器人', amount:'¥180万', prob:'65%' },
      { customer:'苏州精密', product:'售后+升级服务', amount:'¥8万', prob:'95%' },
      { customer:'河南众驰', product:'AMR移动机器人', amount:'¥287万', prob:'75%' },
    ]},
    { stage:'商务谈判', color:'#7C3AED', amount:'¥890万', items:[
      { customer:'上海汽车集团', product:'装配线机器人系统', amount:'¥450万', prob:'80%' },
      { customer:'宁德时代', product:'电池装配协作机器人', amount:'¥440万', prob:'72%' },
    ]},
    { stage:'合同签署', color:'#16A34A', amount:'¥1,240万', items:[
      { customer:'比亚迪', product:'焊接机器人系统', amount:'¥680万', prob:'95%' },
      { customer:'华为终端', product:'精密装配机器人', amount:'¥560万', prob:'98%' },
    ]},
  ],

  deliveries: [
    { id:'DEL-2026-001', customer:'博众精工科技股份有限公司', product:'协作机器人装配系统', status:'安装调试中', statusClass:'status-analyzing', progress:75, milestones:['合同签署','设备发货','现场安装','系统调试','验收测试'] },
    { id:'DEL-2026-002', customer:'苏州精密制造有限公司', product:'UR10e视觉系统升级', status:'验收测试', statusClass:'status-confirm', progress:90, milestones:['合同签署','设备发货','现场安装','系统调试','验收测试'] },
    { id:'DEL-2026-003', customer:'杭州启熵科技有限公司', product:'关节模组定制改造', status:'系统调试', statusClass:'status-analyzing', progress:60, milestones:['合同签署','设备发货','现场安装','系统调试','验收测试'] },
    { id:'DEL-2026-004', customer:'河南众驰富联精工科技', product:'AMR移动机器人系统', status:'设备发货', statusClass:'status-pending', progress:30, milestones:['合同签署','设备发货','现场安装','系统调试','验收测试'] },
  ],

  knowledgeBase: [
    { id:'KB-001', category:'协作机器人', title:'UR10e协作机器人装配线集成方案', desc:'适用于汽车零部件精密装配，负载10kg，重复定位精度±0.03mm，含视觉引导和力控功能', customer:'博众精工', date:'2025-11', match:97, tags:['协作机器人','视觉检测','力控'] },
    { id:'KB-002', category:'协作机器人', title:'精密电子装配协作机器人解决方案', desc:'适用于手机、平板等消费电子精密装配，微米级精度，柔性生产线适配', customer:'华为终端', date:'2025-09', match:94, tags:['精密装配','柔性生产'] },
    { id:'KB-003', category:'工业机器人', title:'焊接机器人系统集成方案', desc:'6轴工业机器人焊接系统，含焊缝跟踪、焊接参数自适应调整，适用于汽车车身焊接', customer:'比亚迪', date:'2025-08', match:88, tags:['焊接','汽车'] },
    { id:'KB-004', category:'视觉系统', title:'工业视觉检测系统技术方案', desc:'基于深度学习的缺陷检测系统，检测精度0.01mm，检测速度200件/分钟', customer:'苏州精密', date:'2025-12', match:96, tags:['视觉检测','深度学习','缺陷检测'] },
    { id:'KB-005', category:'系统集成', title:'工厂自动化改造整体方案', desc:'从人工到半自动化的完整改造方案，含设备选型、工艺优化、MES集成、人员培训', customer:'四川众达', date:'2025-10', match:91, tags:['自动化改造','MES','系统集成'] },
    { id:'KB-006', category:'AMR', title:'仓储物流AMR系统解决方案', desc:'自主移动机器人仓储系统，SLAM导航，支持货架识别、自动充电，日工作22小时', customer:'河南众驰', date:'2025-07', match:93, tags:['AMR','仓储','SLAM'] },
    { id:'KB-007', category:'协作机器人', title:'汽车零部件装配协作机器人方案', desc:'专为汽车零部件装配设计，负载5kg，精度±0.02mm，人机协作安全认证', customer:'上海汽车', date:'2026-01', match:98, tags:['汽车','协作机器人','精密装配'] },
    { id:'KB-008', category:'视觉系统', title:'3D视觉引导机器人抓取方案', desc:'基于3D点云的机器人引导抓取，适用于无序零件抓取，识别率99.5%', customer:'宁德时代', date:'2025-11', match:89, tags:['3D视觉','抓取','点云'] },
    { id:'KB-009', category:'系统集成', title:'电池装配自动化生产线方案', desc:'锂电池模组装配全自动化方案，含协作机器人、视觉检测、MES集成', customer:'宁德时代', date:'2026-02', match:92, tags:['电池','自动化','MES'] },
  ],
};

let currentKBFilter = 'all';

// ===== NAVIGATION =====
const pageConfig = {
  overview:    { title: '工作流总览',   breadcrumb: '首页 / 工作流总览' },
  requirement: { title: '需求中心',     breadcrumb: '首页 / 核心流程 / 需求中心' },
  proposal:    { title: 'AI方案引擎',   breadcrumb: '首页 / 核心流程 / AI方案引擎' },
  rd:          { title: '研发工作台',   breadcrumb: '首页 / 核心流程 / 研发工作台' },
  product:     { title: '产品管理',     breadcrumb: '首页 / 核心流程 / 产品管理' },
  sales:       { title: '销售管理',     breadcrumb: '首页 / 商业流程 / 销售管理' },
  delivery:    { title: '交付管理',     breadcrumb: '首页 / 商业流程 / 交付管理' },
  knowledge:   { title: '知识库',       breadcrumb: '首页 / 智能支撑 / 知识库' },
  cockpit:     { title: '管理驾驶舱',   breadcrumb: '首页 / 智能支撑 / 管理驾驶舱' },
};

function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');
  const cfg = pageConfig[page] || { title: page, breadcrumb: '首页 / ' + page };
  document.getElementById('pageTitle').textContent = cfg.title;
  document.getElementById('breadcrumb').textContent = cfg.breadcrumb;
  if (page === 'requirement') renderRequirements();
  if (page === 'rd') renderRDKanban();
  if (page === 'product') renderProductKanban();
  if (page === 'sales') renderSalesPipeline();
  if (page === 'delivery') renderDeliveryBoard();
  if (page === 'knowledge') renderKnowledgeBase();
  if (page === 'cockpit') renderCockpit();
}

document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', e => { e.preventDefault(); navigateTo(item.dataset.page); });
});

// ===== TOAST =====
function showToast(msg, type = 'info') {
  const icons = { success:'fa-check-circle', error:'fa-times-circle', warning:'fa-exclamation-triangle', info:'fa-info-circle', ai:'fa-magic' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(20px)'; toast.style.transition='all .3s'; setTimeout(()=>toast.remove(),300); }, 3500);
}

// ===== MODAL =====
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ===== OVERVIEW =====
function renderWorkflowList() {
  const list = document.getElementById('workflowList');
  const stageMap = {
    '待分析': { cls:'wf-stage-req', label:'待AI分析' },
    'AI分析中': { cls:'wf-stage-ai', label:'AI分析中' },
    '方案待确认': { cls:'wf-stage-product', label:'方案待确认' },
    '已确认': { cls:'wf-stage-sales', label:'已确认' },
    '已转研发': { cls:'wf-stage-rd', label:'研发中' },
  };
  list.innerHTML = DB.requirements.slice(0,5).map(r => {
    const stage = stageMap[r.status] || { cls:'wf-stage-done', label:r.status };
    return `<div class="wf-item" onclick="showWorkflowDetail('${r.id}')">
      <div class="wf-id">${r.id}</div>
      <div class="wf-customer">${r.customer}</div>
      <div class="wf-desc">${r.desc}</div>
      <span class="wf-stage-badge ${stage.cls}">${stage.label}</span>
      <span class="wf-priority ${r.priority}">${r.priority}</span>
      <div class="wf-progress">
        <div class="wf-progress-bar"><div class="wf-progress-fill" style="width:${r.progress}%;"></div></div>
        <div class="wf-progress-label">${r.progress}%</div>
      </div>
    </div>`;
  }).join('');
}

// ===== REQUIREMENTS =====
function renderRequirements() {
  const statusF = document.getElementById('reqStatusFilter')?.value || '';
  const typeF = document.getElementById('reqTypeFilter')?.value || '';
  let data = DB.requirements.filter(r => {
    if (statusF && r.status !== statusF) return false;
    if (typeF && r.type !== typeF) return false;
    return true;
  });
  document.getElementById('req-total').textContent = DB.requirements.length;
  document.getElementById('req-pending').textContent = DB.requirements.filter(r=>r.status==='待分析').length;
  document.getElementById('req-analyzing').textContent = DB.requirements.filter(r=>r.status==='AI分析中').length;
  document.getElementById('req-confirm').textContent = DB.requirements.filter(r=>r.status==='方案待确认').length;
  document.getElementById('req-done').textContent = DB.requirements.filter(r=>r.status==='已转研发').length;
  const statusClassMap = { '待分析':'status-pending','AI分析中':'status-analyzing','方案待确认':'status-confirm','已确认':'status-confirmed','已转研发':'status-rd' };
  document.getElementById('reqList').innerHTML = data.map(r => `
    <div class="req-card" onclick="showWorkflowDetail('${r.id}')">
      <div class="req-card-header">
        <span class="req-card-id">${r.id}</span>
        <span class="req-card-customer">${r.customer}</span>
        <span class="req-status-badge ${statusClassMap[r.status]||'status-pending'}">${r.status}</span>
        <span class="wf-priority ${r.priority}">${r.priority}</span>
      </div>
      <div class="req-card-desc">${r.desc}</div>
      ${r.status==='AI分析中' ? `<div class="req-ai-progress"><div class="ai-spinner"></div>AI正在分析需求，匹配历史案例库中... 预计完成时间：2小时后</div>` : ''}
      <div class="req-card-footer">
        <span><i class="fas fa-tag"></i>${r.type}</span>
        <span><i class="fas fa-money-bill-wave"></i>预算：${r.budget}万</span>
        <span><i class="fas fa-clock"></i>${r.timeline}</span>
        <span><i class="fas fa-user"></i>${r.owner}</span>
        <span><i class="fas fa-calendar"></i>${r.createdAt}</span>
      </div>
    </div>`).join('');
}

// ===== AI PROPOSAL ENGINE =====
function generateProposal() {
  const customer = document.getElementById('ai_customer').value.trim();
  const desc = document.getElementById('ai_desc').value.trim();
  if (!customer || !desc) { showToast('请填写客户名称和需求描述', 'warning'); return; }
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI分析中...';
  const output = document.getElementById('proposalOutput');
  output.innerHTML = `<div class="ai-generating">
    <div class="ai-generating-icon"><i class="fas fa-magic"></i></div>
    <div class="ai-generating-text">AI正在生成方案...</div>
    <div class="ai-generating-steps" id="aiSteps">
      <div class="ai-step" id="step1"><i class="fas fa-circle-notch fa-spin"></i> 解析需求关键词...</div>
      <div class="ai-step" id="step2"><i class="fas fa-circle"></i> 匹配历史案例库...</div>
      <div class="ai-step" id="step3"><i class="fas fa-circle"></i> 生成技术方案...</div>
      <div class="ai-step" id="step4"><i class="fas fa-circle"></i> 评估风险与资源...</div>
      <div class="ai-step" id="step5"><i class="fas fa-circle"></i> 输出最终方案...</div>
    </div>
  </div>`;
  const steps = [
    { id:'step1', delay:600, text:'解析需求关键词...', icon:'fa-check' },
    { id:'step2', delay:1400, text:'匹配历史案例库（找到 3 个高相似案例）', icon:'fa-check' },
    { id:'step3', delay:2400, text:'生成技术方案...', icon:'fa-check' },
    { id:'step4', delay:3200, text:'评估风险与资源...', icon:'fa-check' },
    { id:'step5', delay:4000, text:'输出最终方案...', icon:'fa-check' },
  ];
  steps.forEach((s, i) => {
    setTimeout(() => {
      const el = document.getElementById(s.id);
      if (el) { el.className = 'ai-step done'; el.innerHTML = `<i class="fas ${s.icon}"></i> ${s.text}`; }
      if (i < steps.length - 1) {
        const next = document.getElementById(steps[i+1].id);
        if (next) { next.className = 'ai-step active'; next.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${steps[i+1].text.split('（')[0]}...`; }
      }
    }, s.delay);
  });
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-magic"></i> AI生成方案';
    showProposalResult(customer, desc);
  }, 4800);
}

function showProposalResult(customer, desc) {
  const type = document.getElementById('ai_type').value;
  const timeline = document.getElementById('ai_timeline').value;
  const budgetMin = document.getElementById('ai_budget_min').value || '50';
  const budgetMax = document.getElementById('ai_budget_max').value || '100';
  const output = document.getElementById('proposalOutput');
  output.innerHTML = `<div class="proposal-result">
    <div class="proposal-result-header">
      <i class="fas fa-magic"></i>
      <div>
        <h3>AI生成方案 — ${customer}</h3>
        <p>基于1,247个历史案例，AI已生成最优技术方案</p>
      </div>
      <div class="proposal-match-score">
        <div class="match-score-num">96%</div>
        <div class="match-score-label">方案匹配度</div>
      </div>
    </div>

    <div class="proposal-section">
      <div class="proposal-section-title"><i class="fas fa-cogs"></i> 推荐技术方案</div>
      <div class="proposal-specs">
        <div class="spec-item"><div class="spec-label">推荐产品</div><div class="spec-value">协作机器人 UR10e + 视觉系统</div></div>
        <div class="spec-item"><div class="spec-label">负载能力</div><div class="spec-value">10kg（满足需求）</div></div>
        <div class="spec-item"><div class="spec-label">重复定位精度</div><div class="spec-value">±0.02mm</div></div>
        <div class="spec-item"><div class="spec-label">视觉系统</div><div class="spec-value">2D+3D复合视觉</div></div>
        <div class="spec-item"><div class="spec-label">控制系统</div><div class="spec-value">CC-3000控制器</div></div>
        <div class="spec-item"><div class="spec-label">安全认证</div><div class="spec-value">ISO 10218-1/2</div></div>
      </div>
    </div>

    <div class="proposal-section">
      <div class="proposal-section-title"><i class="fas fa-history"></i> 匹配历史案例（相似度最高）</div>
      <div class="proposal-cases">
        <div class="case-item">
          <span class="case-match">98%</span>
          <span class="case-name">汽车零部件装配协作机器人方案</span>
          <span class="case-detail">上海汽车集团 · 2026-01 · ¥450万</span>
        </div>
        <div class="case-item">
          <span class="case-match">97%</span>
          <span class="case-name">UR10e协作机器人装配线集成方案</span>
          <span class="case-detail">博众精工 · 2025-11 · ¥120万</span>
        </div>
        <div class="case-item">
          <span class="case-match">94%</span>
          <span class="case-name">精密电子装配协作机器人解决方案</span>
          <span class="case-detail">华为终端 · 2025-09 · ¥180万</span>
        </div>
      </div>
    </div>

    <div class="proposal-section">
      <div class="proposal-section-title"><i class="fas fa-calendar-alt"></i> 项目计划</div>
      <div class="proposal-specs">
        <div class="spec-item"><div class="spec-label">预计周期</div><div class="spec-value">${timeline}</div></div>
        <div class="spec-item"><div class="spec-label">预算估算</div><div class="spec-value">¥${budgetMin}-${budgetMax}万</div></div>
        <div class="spec-item"><div class="spec-label">研发周期</div><div class="spec-value">4-6周</div></div>
        <div class="spec-item"><div class="spec-label">安装调试</div><div class="spec-value">2-3周</div></div>
        <div class="spec-item"><div class="spec-label">验收测试</div><div class="spec-value">1-2周</div></div>
        <div class="spec-item"><div class="spec-label">AI风险评估</div><div class="spec-value" style="color:#16a34a;">低风险</div></div>
      </div>
    </div>

    <div class="proposal-section">
      <div class="proposal-section-title"><i class="fas fa-robot"></i> AI建议</div>
      <div style="background:#EDE9FE;border-radius:8px;padding:12px 14px;font-size:13px;color:#5B21B6;line-height:1.7;border-left:3px solid #7C3AED;">
        基于历史案例分析，建议采用<strong>协作机器人+视觉引导</strong>方案。该方案在类似项目中成功率达98%，平均交付周期比传统方案缩短35%。
        建议重点关注：① 视觉系统标定精度；② 人机协作安全区域设计；③ 与现有MES系统的接口对接。
        预计ROI回收周期：<strong>18-24个月</strong>。
      </div>
    </div>

    <div class="proposal-actions">
      <button class="btn btn-ai" onclick="confirmProposalAndTriggerRD()"><i class="fas fa-check"></i> 确认方案并触发研发</button>
      <button class="btn btn-outline" onclick="showToast('方案已发送至客户邮箱', 'success')"><i class="fas fa-paper-plane"></i> 发送给客户</button>
      <button class="btn btn-outline" onclick="showToast('方案已保存至知识库', 'ai')"><i class="fas fa-save"></i> 保存方案</button>
    </div>
  </div>`;
  showToast('✨ AI方案生成完成！匹配度96%，已找到3个高相似历史案例', 'ai');
}

function confirmProposalAndTriggerRD() {
  showToast('🚀 方案已确认！正在自动创建研发任务...', 'ai');
  setTimeout(() => {
    showToast('✅ 研发任务已自动创建：RD-NEW-001，已通知研发团队', 'success');
    setTimeout(() => navigateTo('rd'), 1500);
  }, 2000);
}

// ===== R&D KANBAN =====
function renderRDKanban() {
  const cols = ['需求分析','方案设计','打样制作','测试验证'];
  const colColors = { '需求分析':'#F59E0B','方案设计':'#0891B2','打样制作':'#7C3AED','测试验证':'#16A34A' };
  document.getElementById('rdKanban').innerHTML = cols.map(col => {
    const tasks = DB.rdTasks[col] || [];
    return `<div class="kanban-col">
      <div class="kanban-col-header">
        <div class="kanban-col-title" style="color:${colColors[col]}"><i class="fas fa-circle" style="font-size:8px;"></i>${col}</div>
        <span class="kanban-col-count">${tasks.length}</span>
      </div>
      <div class="kanban-cards">
        ${tasks.map(t => `<div class="kanban-card" onclick="showToast('查看任务：${t.title}','info')">
          <div class="kanban-card-id">${t.id} · ${t.customer}</div>
          <div class="kanban-card-title">${t.title}</div>
          <div class="kanban-card-desc">${t.desc}</div>
          <div class="kanban-card-footer">
            <span class="kanban-card-owner"><i class="fas fa-user"></i>${t.owner}</span>
            <span class="kanban-priority ${t.priority}">${t.priority}</span>
            <span class="kanban-card-due">${t.due}</span>
          </div>
        </div>`).join('')}
        <button class="btn btn-sm btn-outline" style="width:100%;margin-top:8px;justify-content:center;" onclick="showToast('新建${col}任务','info')">
          <i class="fas fa-plus"></i> 新建任务
        </button>
      </div>
    </div>`;
  }).join('');
}

// ===== PRODUCT KANBAN =====
function renderProductKanban() {
  const cols = ['待测试','测试中','待发布','已发布'];
  const colColors = { '待测试':'#F59E0B','测试中':'#7C3AED','待发布':'#0891B2','已发布':'#16A34A' };
  document.getElementById('productKanban').innerHTML = cols.map(col => {
    const tasks = DB.productTasks[col] || [];
    return `<div class="kanban-col">
      <div class="kanban-col-header">
        <div class="kanban-col-title" style="color:${colColors[col]}"><i class="fas fa-circle" style="font-size:8px;"></i>${col}</div>
        <span class="kanban-col-count">${tasks.length}</span>
      </div>
      <div class="kanban-cards">
        ${tasks.map(t => `<div class="kanban-card" onclick="showToast('查看产品：${t.title}','info')">
          <div class="kanban-card-id">${t.id} · ${t.customer}</div>
          <div class="kanban-card-title">${t.title}</div>
          <div class="kanban-card-desc">${t.desc}</div>
          <div class="kanban-card-footer">
            <span class="kanban-card-owner"><i class="fas fa-user"></i>${t.owner}</span>
            <span class="kanban-priority ${t.priority}">${t.priority}</span>
            <span class="kanban-card-due">${t.due}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

// ===== SALES PIPELINE =====
function renderSalesPipeline() {
  document.getElementById('salesPipeline').innerHTML = DB.salesData.map(stage => `
    <div class="sales-stage-section">
      <div class="sales-stage-header">
        <div class="sales-stage-dot" style="background:${stage.color};"></div>
        <div class="sales-stage-name">${stage.stage}</div>
        <div class="sales-stage-amount">${stage.amount}</div>
      </div>
      <div class="sales-items">
        ${stage.items.map(item => `<div class="sales-item" onclick="showToast('查看商机：${item.customer}','info')">
          <div class="sales-item-customer">${item.customer}</div>
          <div class="sales-item-product">${item.product}</div>
          <div class="sales-item-footer">
            <span class="sales-item-amount">${item.amount}</span>
            <span class="sales-item-prob">成交概率 ${item.prob}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>`).join('');
}

// ===== DELIVERY BOARD =====
function renderDeliveryBoard() {
  const milestoneProgress = { 'DEL-2026-001':3, 'DEL-2026-002':4, 'DEL-2026-003':3, 'DEL-2026-004':1 };
  document.getElementById('deliveryBoard').innerHTML = DB.deliveries.map(d => {
    const doneCount = milestoneProgress[d.id] || 0;
    const milestones = d.milestones.map((m, i) => {
      const cls = i < doneCount ? 'done' : i === doneCount ? 'active' : 'pending';
      const icon = i < doneCount ? 'fa-check' : i === doneCount ? 'fa-circle-notch fa-spin' : 'fa-circle';
      return `<div class="milestone ${cls}"><i class="fas ${icon}"></i>${m}</div>`;
    }).join('');
    return `<div class="delivery-item" onclick="showToast('查看交付：${d.customer}','info')">
      <div class="delivery-header">
        <span class="delivery-id">${d.id}</span>
        <span class="delivery-customer">${d.customer}</span>
        <span class="delivery-status ${d.statusClass}">${d.status}</span>
      </div>
      <div style="font-size:12px;color:#94A3B8;margin-bottom:8px;">${d.product}</div>
      <div class="delivery-progress-section">
        <div class="delivery-progress-bar"><div class="delivery-progress-fill" style="width:${d.progress}%;"></div></div>
        <div class="delivery-progress-pct">${d.progress}%</div>
      </div>
      <div class="delivery-milestones">${milestones}</div>
    </div>`;
  }).join('');
}

// ===== KNOWLEDGE BASE =====
function renderKnowledgeBase(filter = currentKBFilter, search = '') {
  let data = DB.knowledgeBase;
  if (filter !== 'all') data = data.filter(k => k.category === filter);
  if (search) data = data.filter(k => k.title.includes(search) || k.desc.includes(search) || k.tags.some(t => t.includes(search)));
  document.getElementById('kbGrid').innerHTML = data.map(k => `
    <div class="kb-card" onclick="showToast('查看案例：${k.title}','ai')">
      <div class="kb-card-category">${k.category}</div>
      <div class="kb-card-title">${k.title}</div>
      <div class="kb-card-desc">${k.desc}</div>
      <div class="kb-card-footer">
        <span><i class="fas fa-building"></i> ${k.customer} · ${k.date}</span>
        <span class="kb-card-match">匹配度 ${k.match}%</span>
      </div>
    </div>`).join('');
}

function filterKB(cat, btn) {
  currentKBFilter = cat;
  document.querySelectorAll('.kb-cat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderKnowledgeBase(cat, document.getElementById('kbSearch')?.value || '');
}

function searchKB(val) {
  renderKnowledgeBase(currentKBFilter, val);
}

// ===== COCKPIT =====
function renderCockpit() {
  document.getElementById('riskAlerts').innerHTML = `
    <div class="risk-alert high"><i class="fas fa-exclamation-circle"></i><div><strong>研发延期风险</strong><br>RD-005关节模组样机制作进度滞后3天，可能影响博众精工交付节点</div></div>
    <div class="risk-alert medium"><i class="fas fa-exclamation-triangle"></i><div><strong>资源冲突预警</strong><br>6月下旬研发团队同时承接4个项目，人力资源可能不足</div></div>
    <div class="risk-alert low"><i class="fas fa-info-circle"></i><div><strong>供应链提醒</strong><br>关键零部件（精密轴承）交货周期延长至3周，建议提前备货</div></div>`;
  document.getElementById('aiSuggestions').innerHTML = `
    <div class="ai-suggestion"><i class="fas fa-magic"></i><div><strong>优先级调整建议</strong>：建议将RD-005提升为最高优先级，调配2名工程师支援，可缩短延期至1天</div></div>
    <div class="ai-suggestion"><i class="fas fa-magic"></i><div><strong>资源优化建议</strong>：7月初可将苏州精密项目（已完成90%）的工程师调配至四川众达项目</div></div>
    <div class="ai-suggestion"><i class="fas fa-magic"></i><div><strong>销售机会提醒</strong>：深圳鹏城需求与华为终端历史案例高度相似（94%），建议直接复用方案，可缩短报价周期50%</div></div>`;
}

// ===== REQUIREMENT MODAL =====
function openNewRequirement() { openModal('reqModal'); }

function submitRequirement() {
  const customer = document.getElementById('req_customer').value.trim();
  const desc = document.getElementById('req_desc').value.trim();
  if (!customer || !desc) { showToast('请填写客户名称和需求描述', 'warning'); return; }
  const newReq = {
    id: 'REQ-2026-' + String(DB.requirements.length + 1).padStart(3,'0'),
    customer, type: document.getElementById('req_type').value,
    desc, budget: document.getElementById('req_budget').value || '待定',
    timeline: document.getElementById('req_timeline').value,
    priority: document.getElementById('req_priority').value,
    owner: document.getElementById('req_owner').value || '待分配',
    status: 'AI分析中', createdAt: new Date().toISOString().slice(0,10), progress: 15
  };
  DB.requirements.unshift(newReq);
  closeModal('reqModal');
  showToast(`✅ 需求 ${newReq.id} 已提交！AI引擎已启动分析，预计2-4小时内生成方案`, 'ai');
  ['req_customer','req_desc','req_budget','req_owner'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  if (document.getElementById('page-requirement').classList.contains('active')) renderRequirements();
  renderWorkflowList();
  setTimeout(() => showToast('🔍 AI正在匹配历史案例库，已找到 2 个高相似案例...', 'ai'), 3000);
}

// ===== WORKFLOW DETAIL =====
function showWorkflowDetail(id) {
  const req = DB.requirements.find(r => r.id === id);
  if (!req) return;
  document.getElementById('wfModalTitle').textContent = `工作流详情 — ${req.id}`;
  const stageOrder = ['待分析','AI分析中','方案待确认','已确认','已转研发'];
  const stageDetails = {
    '待分析': { icon:'fa-lightbulb', desc:'需求已录入，等待AI引擎分析' },
    'AI分析中': { icon:'fa-magic', desc:'AI正在分析需求，匹配历史案例库' },
    '方案待确认': { icon:'fa-file-alt', desc:'AI方案已生成，等待客户确认' },
    '已确认': { icon:'fa-check-circle', desc:'客户已确认方案，准备转入研发' },
    '已转研发': { icon:'fa-flask', desc:'研发任务已创建，正在打样制作' },
  };
  const currentIdx = stageOrder.indexOf(req.status);
  const timeline = stageOrder.map((s, i) => {
    const status = i < currentIdx ? 'done' : i === currentIdx ? 'active' : 'pending';
    const detail = stageDetails[s];
    return `<div class="wf-timeline-item">
      <div class="wf-timeline-dot ${status}"><i class="fas ${detail.icon}"></i></div>
      <div class="wf-timeline-content">
        <div class="wf-timeline-title">${s}</div>
        <div class="wf-timeline-desc">${detail.desc}</div>
        ${status !== 'pending' ? `<div class="wf-timeline-time">${status==='done'?'已完成':'进行中'}</div>` : ''}
      </div>
    </div>`;
  }).join('');
  document.getElementById('wfModalBody').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
      <div><div style="font-size:10.5px;color:#94A3B8;font-weight:700;text-transform:uppercase;margin-bottom:4px;">客户</div><div style="font-size:14px;font-weight:700;color:#0A1628;">${req.customer}</div></div>
      <div><div style="font-size:10.5px;color:#94A3B8;font-weight:700;text-transform:uppercase;margin-bottom:4px;">需求类型</div><div>${req.type}</div></div>
      <div><div style="font-size:10.5px;color:#94A3B8;font-weight:700;text-transform:uppercase;margin-bottom:4px;">预算</div><div style="font-weight:600;color:#16A34A;">¥${req.budget}万</div></div>
      <div><div style="font-size:10.5px;color:#94A3B8;font-weight:700;text-transform:uppercase;margin-bottom:4px;">交付周期</div><div>${req.timeline}</div></div>
    </div>
    <div style="margin-bottom:16px;"><div style="font-size:10.5px;color:#94A3B8;font-weight:700;text-transform:uppercase;margin-bottom:6px;">需求描述</div><div style="padding:10px 14px;background:#F8FAFC;border-radius:8px;font-size:13px;line-height:1.7;border-left:3px solid #7C3AED;">${req.desc}</div></div>
    <div style="margin-bottom:16px;"><div style="font-size:10.5px;color:#94A3B8;font-weight:700;text-transform:uppercase;margin-bottom:10px;">工作流进度</div><div class="wf-detail-timeline">${timeline}</div></div>`;
  const footer = document.getElementById('wfModalFooter');
  let btns = '<button class="btn btn-outline" onclick="closeModal(\'wfModal\')">关闭</button>';
  if (req.status === '方案待确认') btns += `<button class="btn btn-ai" onclick="closeModal('wfModal');navigateTo('proposal');showToast('已跳转至AI方案引擎','ai')"><i class="fas fa-magic"></i> 查看AI方案</button>`;
  if (req.status === '已确认') btns += `<button class="btn btn-ai" onclick="closeModal('wfModal');showToast('研发任务已创建！','success');navigateTo('rd')"><i class="fas fa-flask"></i> 触发研发</button>`;
  footer.innerHTML = btns;
  openModal('wfModal');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderWorkflowList();
  renderKnowledgeBase();
  renderCockpit();
  setTimeout(() => showToast('🤖 AI引擎已就绪，正在监控 6 个活跃工作流', 'ai'), 1000);
  setTimeout(() => showToast('📊 今日新增需求 2 条，AI已自动启动分析', 'info'), 3000);
});