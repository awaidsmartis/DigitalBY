export type ProductMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; title?: string }

export type ProductReference = {
  label: string
  url: string
  kind?: 'product-page' | 'documentation' | 'pdf' | 'other'
}

export type ProductCta = {
  primary: { label: string; url: string }
  secondary: { label: string; url: string }
}

export type ProductStat = { value: string; label: string; note?: string }

export type ProductHighlight = { value: string; label: string }

export type ProductKeyFeature = {
  title: string
  summary: string
  bullets: string[]
}

export type ProductBenefit = { title: string; description: string }

export type ProductUseCase = { title: string; description: string }

export type ProductBlog = { title: string; author: string; date: string; url?: string }

export type ProductFaq = { q: string; a: string }

export interface Product {
  /** kiosk-internal id */
  id: string
  name: string
  category: string
  shortDescription: string
  description: string
  valueProposition: string[]
  features: string[]
  logo: string
  /** main image used in cards/carousels */
  image: string
  media: ProductMedia[]
  references: ProductReference[]
  /** kept for compatibility with existing (non-kiosk) components */
  price: string
  /** kept for compatibility with existing (non-kiosk) components */
  specs: Record<string, string>
  /** optional legacy fields used by existing UI */
  isNew?: boolean
  rating?: number
  reviews?: number

  /** Optional rich marketing content (some products use this) */
  cta?: ProductCta
  stats?: ProductStat[]
  highlights?: ProductHighlight[]
  keyFeatures?: ProductKeyFeature[]
  benefits?: ProductBenefit[]
  useCases?: ProductUseCase[]
  blogs?: ProductBlog[]
  faqs?: ProductFaq[]
}

/**
 * NOTE: This file is the migrated “source of truth” from:
 * DigitalBYSite/src/Modules/SmartProducts/ProductsDetails.js
 */
export const products: Product[] = [
  {
    id: 'smart-ai',
    name: 'Smart AI',
    category: 'Enterprise AI',
    shortDescription: 'The Cognitive Intelligence Layer for Enterprise Operations',
    description:
      'From integration to intelligence. Smart AI understands your business across systems—reasoning over operations like orders, inventory, and workflows to deliver unified, actionable intelligence. It unifies fragmented system states into a single business truth and empowers business and technical users to design, govern, and interact with their enterprise through a unified intelligence layer.',
    valueProposition: [
      'Unifies fragmented system states into a single business truth.',
      'Connect enterprise systems and govern what Smart AI is allowed to execute.',
      'Reason across operations like orders, inventory, and workflows.',
      'Expose internal capabilities as MCP tools for AI agents.',
      'Built-in evaluation and traces to validate tool selection and behavior.',
    ],
    features: [
      'Unified intelligence layer across connected systems.',
      'Governed, permission-checked execution with role-based access control.',
      'MCP export and managed integrations for agent ecosystems.',
      'Metadata-driven design for consistent, reusable enterprise functions.',
      'Smart Chat for secure intent-to-action interaction.',
    ],
    logo: '/assets/images/icons/smart-is-small.png',
    image: '/assets/images/icons/smart-is-small.png',
    media: [{ type: 'image', src: '/assets/images/icons/smart-is-small.png', alt: 'Smart AI' }],
    references: [
      { label: 'Documentation', url: 'https://oracularis.github.io/smartai/', kind: 'documentation' },
      { label: 'Smart IS', url: 'https://www.smart-is.com/', kind: 'other' },
    ],
    cta: {
      primary: { label: 'View Documentation', url: 'https://oracularis.github.io/smartai/' },
      secondary: { label: 'Visit Smart IS', url: 'https://www.smart-is.com/' },
    },
    stats: [
      { value: 'TBD', label: 'Active Deployments', note: 'Application metrics will be added as Smart AI rolls out across organizations.' },
      { value: 'TBD', label: 'Connected Systems', note: 'Smart AI is designed to connect and reason across WMS, ERP, CRM, and analytics platforms.' },
      { value: 'TBD', label: 'Weekly Interactions', note: 'Usage and engagement metrics will be added soon.' },
    ],
    highlights: [
      { value: 'Unified', label: 'Single business truth across systems' },
      { value: 'Governed', label: 'Permission-checked, role-based execution' },
      { value: 'Extensible', label: 'MCP + managed integrations' },
      { value: 'Observable', label: 'Traces, diffs, and execution visibility' },
    ],
    keyFeatures: [
      {
        title: 'Built for Unified Operational Excellence',
        summary: 'Smart AI makes it easy to connect enterprise systems, define business logic, and interact securely through Smart Chat.',
        bullets: [
          'Unifies fragmented system states into a single business truth',
          'Maps user intent to approved system actions',
          'Secure, governed execution with clear observability',
        ],
      },
      {
        title: 'Developer-Friendly Interface',
        summary: 'SmartFX Studio provides an intuitive interface to configure business logic, govern execution, and manage enterprise functions.',
        bullets: [
          'Modern, Intuitive UI for managing projects, systems, and functions',
          'Monaco Code Editor for Python, SQL, or MOCA/MSQL with syntax highlighting',
          'Git Status Awareness with built-in diff viewer and revert options',
          'Searchable Help Panel backed by your repo’s own content',
        ],
      },
      {
        title: 'Manage Connections and Credentials',
        summary: 'Create connections to your systems and manage credentials securely from a centralized console.',
        bullets: [
          'Create new connections: configure endpoints, secrets, and system details',
          'Connect to leading platforms: OpenAI, Claude, Snowflake, enterprise systems, and more',
          'Add or update credentials anytime with controlled access',
        ],
      },
      {
        title: 'MCP Server Integration',
        summary: 'Expose enterprise functions as MCP tools for AI agents—bridging internal platforms with the broader AI ecosystem.',
        bullets: [
          'Generate MCP links and publish live MCP servers from functions',
          'Inspect & validate tool lists and test them end-to-end with Smart Chat',
          'Export to MCP-compatible platforms like Microsoft Copilot, OpenAI, and Claude',
          'Centralized connection management to update/revoke/regenerate links safely',
        ],
      },
      {
        title: 'Centralized Metadata Management',
        summary: 'Keep every function consistent across your repository using shared tags, domains, and reusable collections.',
        bullets: [
          'Tags & Domains: define reusable data types, enums, and required flags once',
          'Input/Output collections: write once, reuse across teams and functions',
          'Consistency at scale: prevent schema drift and keep systems predictable',
        ],
      },
      {
        title: 'Function Evaluation',
        summary: 'Test how well your LLM selects the right tool, and detect ambiguity before going to production.',
        bullets: [
          'AI-generated test questions to stress-test tool selection',
          'Scored reports with traces showing what was sent and returned',
          'Detects overlap, vague args, ambiguity, and execution reliability',
        ],
      },
      {
        title: 'Smart Chat',
        summary: 'A secure conversational interface that interprets intent, applies business logic, and executes governed actions across connected systems.',
        bullets: [
          'Ask questions that return live operational data (orders, inventory, shipments, devices)',
          'Run approved actions and schedule workflows',
          'Turn results into summaries, charts, and dashboards',
          'Full observability: view intent logic and the invoked command',
        ],
      },
    ],
    benefits: [
      {
        title: 'Unified AI Architecture',
        description: 'Combines Smart Chat, Enterprise Mesh, and Smart FX into a single platform for building, governing, and executing enterprise AI workflows end to end.',
      },
      {
        title: 'Secure Execution Layer',
        description: 'Ensures every request is validated, permission-checked, and executed through approved logic with full governance and role-based access control.',
      },
      {
        title: 'Function-Driven Design',
        description: 'Define reusable, version-controlled Smart Functions that standardize how AI interacts with enterprise systems and executes business logic.',
      },
      {
        title: 'Multi-System Intelligence',
        description: 'Understand and reason across WMS, ERP, CRM, and more—unifying fragmented system states into a single, consistent business view.',
      },
      {
        title: 'Built-In Evaluation & Testing',
        description: 'Validate tool selection, detect ambiguity, and test business logic before deployment using integrated evaluation frameworks and reporting.',
      },
      {
        title: 'Extensible Integration Layer',
        description: 'Connect external systems via native protocols and expose capabilities as tools for AI agents through MCP and managed integrations.',
      },
    ],
    useCases: [
      {
        title: 'Enterprise System Orchestration',
        description: 'Design and execute workflows across WMS, ERP, and other systems through unified, governed logic.',
      },
      {
        title: 'Multi-System Integration',
        description: 'Connect and manage multiple enterprise systems in one place, enabling seamless data flow and interoperability.',
      },
      {
        title: 'AI-Driven Operations',
        description: 'Leverage AI to automate decision-making, generate insights, and enhance operational efficiency in real time.',
      },
      {
        title: 'Testing & Validation',
        description: 'Validate business logic, tool selection, and system behavior before deployment using built-in evaluation and testing capabilities.',
      },
      {
        title: 'Real-Time Insights & Dashboards',
        description: 'Transform live system data into actionable insights, summaries, and visual dashboards for better decision-making.',
      },
      {
        title: 'Troubleshooting & Debugging',
        description: 'Identify and resolve issues quickly with full visibility into execution flows, system interactions, and responses.',
      },
    ],
    blogs: [],
    faqs: [],
    price: 'Contact for pricing',
    specs: {},
    isNew: true,
    rating: 4.8,
    reviews: 0,
  },
  {
    id: 'moca-client',
    name: 'MOCA Client',
    category: 'Blue Yonder',
    shortDescription: 'Supercharge Your Blue Yonder Development',
    description:
      'The MOCA Client is an intuitive, all-in-one Blue Yonder development tool for accessing, prototyping, and troubleshooting Blue Yonder applications. It features multi-tab navigation, built-in security, integrated change management, and robust audit trails. This tool allows developers to access and manage environments at the MOCA Command Level efficiently, ensuring seamless execution and integration.',
    valueProposition: [
      'A modern, intuitive UI designed for both beginners and experienced developers.',
      'Intelligent auto-complete, keyboard shortcuts, and context-aware recommendations for streamlined query writing.',
      'Effortlessly edit, save, and reuse commands with built-in history tracking and improved workflow efficiency.',
      'Direct access to Blue Yonder data with high-performance execution and minimal latency.',
      'Prevent unintended commits in production with configurable policy enforcement and registry settings.',
      'Enterprise-grade security standards to maintain compliance and prevent unauthorized modifications.',
      'Open and manage multiple connection tabs simultaneously without needing to restart.',
      'Effortless switching between environments to accelerate development across multiple instances.',
    ],
    features: [
      'Comprehensive documentation and step-by-step guides to ensure ease of use and maximum productivity.',
      'Seamlessly integrates with SmartApps tools like AuTest and Warehouse Migrator for a connected workflow.',
      'Automatic transfer of saved server details, eliminating repetitive manual setup.',
      'Streamlined license management across SmartApps-enabled products, simplifying administration.',
      'Cancel long-running queries or executions without disrupting your workflow.',
      'Built-in auditability and controls to support enterprise governance.',
    ],
    logo: '/assets/images/products-icons/MocaClient.png',
    image: '/assets/images/products/images/MocaClient/Moca1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/mocaclient/MocaMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/mocaclient/MocaClient-Video-1.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/Moca1.png' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/Moca2.png' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/Moca3.png' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/Moca4.png' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/Moca5.png' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/Moca6.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-is-moca-client/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/mocaclient/', kind: 'documentation' },
    ],
    cta: {
      primary: { label: 'Download Now', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-is-moca-client/' },
      secondary: { label: 'View Documentation', url: 'https://oracularis.github.io/mocaclient/' },
    },
    stats: [
      { value: '845+', label: 'Developers trust MOCA Client' },
      {
        value: '1,740+',
        label: 'Downloads',
        note: 'The MOCA Client has been widely adopted, reflecting its popularity and effectiveness among BY developers.',
      },
      {
        value: '360+',
        label: 'Organizations',
        note: 'Companies of all sizes have implemented the MOCA Client, showcasing its versatility across different industries.',
      },
    ],
    highlights: [
      { value: '40%', label: 'Faster Development' },
      { value: '100%', label: 'Blue Yonder Compatible' },
      { value: '24/7', label: 'Developer Support' },
      { value: '845+', label: 'Active Users' },
    ],
    keyFeatures: [
      {
        title: 'Developer-Friendly Interface',
        summary: 'Designed with developers in mind, MOCA Client offers an intuitive interface that makes complex tasks simple and efficient.',
        bullets: [
          'A modern, intuitive UI designed for both beginners and experienced developers.',
          'Intelligent auto-complete, keyboard shortcuts, and context-aware recommendations for streamlined query writing.',
          'Effortlessly edit, save, and reuse commands with built-in history tracking and improved workflow efficiency.',
          'Comprehensive documentation and step-by-step guides to ensure ease of use and maximum productivity.',
        ],
      },
      {
        title: 'Seamless Blue Yonder Integration',
        summary: 'MOCA Client offers direct access to Blue Yonder data while ensuring optimized performance and robust security, respecting your existing infrastructure.',
        bullets: [
          'Direct access to Blue Yonder data with high-performance execution and minimal latency.',
          'Prevent unintended commits in production with configurable policy enforcement and registry settings.',
          'Enterprise-grade security standards to maintain compliance and prevent unauthorized modifications.',
          'Fully integrates with existing client infrastructure, ensuring minimal disruptions and easy adoption.',
        ],
      },
      {
        title: 'Smart Apps Connectivity',
        summary: 'MOCA Client seamlessly integrates with SmartApps to streamline automation, issue tracking, and data migration with tools like AuTest, WH Migrator, and Issue Assignment.',
        bullets: [
          'Seamlessly integrates with SmartApps tools like AuTest, WH Migrator, and Issue Assignment for a connected workflow.',
          'Automatic transfer of saved server details, eliminating repetitive manual setup.',
          'Streamlined license management for all SmartApps-enabled products, simplifying administration.',
        ],
      },
      {
        title: 'Multiple Connection Tabs',
        summary: 'Unlike WinMSQL, MOCA Client allows you to open multiple tabs for connections without having to close & restart the application, saving you valuable development time.',
        bullets: [
          'Open and manage multiple connection tabs simultaneously without needing to restart.',
          'Cancel long-running queries or executions without disrupting your workflow.',
          'Effortless switching between environments to accelerate development across multiple instances.',
        ],
      },
      {
        title: 'Add-ons & Extensions',
        summary: 'Unlock the full potential of MOCA Client with a suite of powerful add-ons and extensions designed to enhance functionality, automation, and user experience.',
        bullets: [
          'Automate testing and validation with integrated AuTest support.',
          'Seamlessly migrate warehouse data across environments with the built-in Warehouse Migrator.',
          'Track and log development changes using Issue Assignment for enhanced visibility and accountability.',
          'Additional tools for report viewing, label printing, rollout building, report format conversion, and database comparison to streamline your workflow.',
        ],
      },
      {
        title: 'Advanced Debugging & Troubleshooting',
        summary: 'Moca Client allows to easily detect and resolve issues with MOCA Client’s built-in debugging tools, ensuring seamless Blue Yonder implementations.',
        bullets: [
          'Real-time error detection and alerting for faster issue resolution.',
          'Detailed query logs and execution insights for pinpointing and resolving problems efficiently.',
          'Optimized debugging workflow, minimizing downtime and accelerating fixes for critical issues.',
        ],
      },
    ],
    benefits: [
      {
        title: 'Time Savings',
        description: 'Eliminate the need to close and restart connections, saving up to 40% of your development time.',
      },
      {
        title: 'Efficient Performance',
        description: 'Perform multiple tasks in the most efficient manner possible with optimized query execution.',
      },
      {
        title: 'Infrastructure Compatibility',
        description: 'Works with your existing Blue Yonder infrastructure without requiring major changes.',
      },
      {
        title: 'Developer Empowerment',
        description: 'A tool created by developers for developers, designed to address real-world challenges.',
      },
      {
        title: 'Comprehensive Documentation',
        description: 'Detailed guides for both beginners and experienced users to master all features.',
      },
      {
        title: 'Continuous Improvement',
        description: 'Regular updates and new features based on developer feedback and needs.',
      },
    ],
    useCases: [
      {
        title: 'Database Query Optimization',
        description: 'Developers use MOCA Client to test and optimize complex queries against Blue Yonder databases without the limitations of WinMSQL.',
      },
      {
        title: 'Multi-Environment Development',
        description: 'Work across development, testing, and production environments simultaneously with multiple connection tabs.',
      },
      {
        title: 'Data Migration Projects',
        description: 'Efficiently move and transform data between Blue Yonder instances with powerful query capabilities.',
      },
      {
        title: 'Troubleshooting & Debugging',
        description: 'Quickly identify and resolve issues in Blue Yonder implementations with direct data access and efficient querying.',
      },
    ],
    blogs: [
      { title: 'Introduction to MOCA Client by Smart IS', author: 'Khurram Ahmad', date: 'May 26, 2020' },
      { title: 'Some Handy Moca Commands', author: 'Saad Ahmad', date: 'February 13, 2019' },
      { title: 'Querying JDA/BY WMS Data for Adhoc Analysis', author: 'Saad Ahmad', date: 'February 7, 2019' },
    ],
    faqs: [
      {
        q: 'How is the MOCA Client different from WinMSQL?',
        a: 'Unlike WinMSQL, the MOCA Client supports multiple connection tabs, eliminating the need to close and reopen the application when switching environments. It also features auto-complete, intelligent suggestions, and advanced debugging tools for more efficient development.',
      },
      {
        q: 'Is the MOCA Client compatible with all Blue Yonder environments?',
        a: 'Yes. The MOCA Client is 100% compatible with Blue Yonder and integrates seamlessly with existing infrastructure without requiring major changes or additional configuration.',
      },
      {
        q: 'What SmartApps are integrated with the MOCA Client?',
        a: 'MOCA Client integrates with SmartApps, including AuTest (automated testing), WH Migrator (warehouse data migration), and Issue Assignment (development tracking), enabling a connected, automated workflow across your development pipeline.',
      },
      {
        q: 'How does the MOCA Client support faster development cycles?',
        a: 'With features like intelligent auto-complete, multi-tab connections, reusable query history, and advanced workflow tools, MOCA Client helps developers save up to 40% of their time compared to legacy tools.',
      },
      {
        q: 'How does the MOCA Client support secure development practices?',
        a: 'The tool includes enterprise-grade security features, configurable policy enforcement to prevent unintended changes in production, and robust user access control to ensure all development complies with your organization’s security standards.',
      },
      {
        q: 'How does MOCA Client help with version control or audit trails?',
        a: 'MOCA Client includes robust audit trail functionality, making it easy to track command execution history, monitor changes, and ensure development accountability across teams.',
      },
      {
        q: 'How does MOCA Client assist with Blue Yonder data access and analysis?',
        a: 'MOCA Client provides direct access to Blue Yonder data at the MOCA command level, enabling deep data interrogation, transformation, and troubleshooting without latency or data access restrictions.',
      },
      {
        q: 'What types of logs and insights does the debugging feature provide?',
        a: 'MOCA Client offers detailed execution logs, real-time error messages, and insights into query performance, making it easier to isolate and resolve issues quickly.',
      },
      {
        q: 'Does MOCA Client require installation, or is it browser-based?',
        a: 'MOCA Client is a desktop application that requires installation. It is lightweight, regularly updated, and built for high performance, unlike browser-based tools that may be limited in capability or speed.',
      },
      {
        q: 'Does MOCA Client support parallel development?',
        a: 'Yes. With its multi-tab, multi-environment support, developers can run parallel queries, test across environments, and validate deployments without interrupting ongoing work in other instances.',
      },
      {
        q: 'How does MOCA Client simplify server access for developers?',
        a: 'MOCA Client provides direct access to Blue Yonder environments via the MOCA layer, eliminating the need to access the Application Server directly. This abstraction simplifies the development workflow and reduces potential risks tied to direct server interactions.',
      },
      {
        q: 'What enterprise controls are supported in the MOCA Client to enforce governance?',
        a: 'MOCA Client allows enterprises to enforce policies such as minimum version requirements, restricted environment access, and registry-based settings. These controls help standardize tool usage across teams and maintain compliance with internal IT governance frameworks.',
      },
      {
        q: 'How does MOCA Client streamline license management for SmartApps and add-ons?',
        a: 'With the integrated Cloud Connect feature, MOCA Client allows users to directly access the AppSmart website to manage licenses, generate app keys, and update profile information. This eliminates manual license handling and ensures all SmartApps are properly licensed and up to date.',
      },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: true,
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 'autest',
    name: 'AuTest',
    category: 'Blue Yonder',
    shortDescription: 'AuTest: Blue Yonder Automated Testing Solution',
    description:
      'AuTest is an Automated Testing Solution designed to streamline and automate the testing of WMS use cases for BY WMS users, eliminating the need for manual intervention. It supports several types of tests, ensuring a versatile and robust testing environment.',
    valueProposition: [
      'Create, manage, and execute automated tests across core WMS functions.',
      'Leverage native JDA/BY components and custom logic for targeted testing.',
      'Automate MOCA-based tests for backend processing and system logic.',
      'Run RF-based tests to validate device workflows and forms.',
      'Execute Web UI-based tests to simulate user interactions and interface behavior.',
      'Includes built-in stress testing to evaluate performance under simulated load.',
      'Serverless architecture with no on-premise components required.',
      'Clear reporting and drill-down to individual steps for fast root-cause analysis.',
    ],
    features: [
      'Fast, lightweight deployment with minimal configuration.',
      'Execute tests securely from any location with internet access.',
      'Fully compatible with MOCA, RF, and Web UI layers.',
      'Real-time visibility into test outcomes: Passed, Failed, or Requires Attention.',
      'Time-based filtering and trend views to monitor execution quality over time.',
    ],
    logo: '/assets/images/products-icons/Autest.png',
    image: '/assets/images/products/images/AuTest/Autest1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/autest/AutestMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/autest/AutestDemo.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest1.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest2.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest3.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest4.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest5.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest6.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/autest/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/autest', kind: 'documentation' },
    ],
    cta: {
      primary: { label: 'Learn More', url: 'https://www.smart-is.com/what-we-do/smart-product/autest/' },
      secondary: { label: 'View Documentation', url: 'https://oracularis.github.io/autest' },
    },
    stats: [
      { value: '500+', label: 'Developers trust AuTest' },
      {
        value: '14,000+',
        label: 'Executed Test Cases',
        note: 'Organizations worldwide have executed thousands of automated tests using AuTest to improve their Blue Yonder WMS testing',
      },
      {
        value: '92%',
        label: 'Decision Confidence',
        note: 'Decision confidence is achieved through consistent, validated results that guide toward faster, more reliable go-live approvals.',
      },
    ],
    highlights: [
      { value: '100%', label: 'Blue Yonder Compatibility' },
      { value: '60%', label: 'Manual Effort Reduced' },
      { value: '250+', label: 'Test Case Library' },
      { value: '90%', label: 'Traceability Boost' },
    ],
    keyFeatures: [
      {
        title: 'Flexible Testing Platform',
        summary:
          'AuTest delivers a versatile and feature-rich testing environment tailored for Blue Yonder WMS, enabling detailed validation of business processes.',
        bullets: [
          'Create, manage, and execute automated tests across core WMS functions',
          'Leverage native JDA/BY components and custom logic for targeted testing',
          'Ensure full coverage of operational workflows and configurations.',
        ],
      },
      {
        title: 'Versatile Test Scenarios',
        summary:
          'With support for MOCA, RF, and Web UI-based tests, AuTest provides full-spectrum test execution, automating validation at every layer of the WMS environment.',
        bullets: [
          'Automate MOCA-based tests for backend processing and system logic',
          'Run RF-based tests to validate warehouse device workflows and forms',
          'Execute Web UI-based tests to simulate user interactions and interface behavior',
          'Includes built-in stress testing to evaluate performance under simulated load',
        ],
      },
      {
        title: 'Cloud-Based Execution',
        summary:
          'AuTest simplifies test execution by eliminating infrastructure overhead. Tests run directly from the cloud, using only a URL to connect to your target WMS.',
        bullets: [
          'Serverless architecture with no on-premise components required',
          'Fast, lightweight deployment with minimal configuration',
          'Execute tests securely from any location with internet access',
        ],
      },
      {
        title: 'Component Utilization',
        summary:
          'AuTest intelligently utilizes your existing JDA/BY components and custom-built modules, ensuring automated tests reflect the actual system environment.',
        bullets: [
          'Integrates seamlessly with native BY configuration and extensions',
          'Enables test creation using both standard and custom business logic',
          'Fully compatible with MOCA, RF, and Web UI layers',
        ],
      },
      {
        title: 'Clear, Actionable Reports',
        summary:
          'AuTest provides detailed, easy-to-interpret execution reports, eliminating the need for manual log reviews and enabling fast issue identification.',
        bullets: [
          'Real-time visibility into test outcomes: Passed, Failed, or Requires Attention',
          'Drill into each step of any previous test for root cause analysis',
          'Structured reports for quick decision-making',
        ],
      },
      {
        title: 'Key Dashboard Features',
        summary:
          'AuTest includes powerful dashboards that provide a clear, visual overview of your testing activity. Whether you’re tracking progress, identifying failures, or validating trends, dashboards help teams make informed decisions with ease.',
        bullets: [
          'Time-Based Filters: View test and runset execution data for any custom time range—daily, weekly, monthly, or custom date spans.',
          'Execution Trends: Line and bar charts show pass/fail rates and execution volumes over time.',
          'Real-Time Metrics: Monitor active executions, success rates, and alerts as they happen.',
          'Runset Breakdown: Analyze execution outcomes for specific runsets or environments.',
          'Error Heatmaps: Quickly spot recurring issues or bottlenecks across test cycles.',
        ],
      },
    ],
    benefits: [
      {
        title: 'Time Savings',
        description: 'Accelerate test cycles by automating repetitive test cases, reducing manual testing time by up to 40%.',
      },
      {
        title: 'Quick Solutions',
        description: 'Facilitate faster deployments of JDA/BY solutions through end-to-end automated validation workflows.',
      },
      {
        title: 'Prepackaged Tests',
        description: 'Start testing immediately with ready-to-use test cases for common WMS processes.',
      },
      {
        title: 'Reduced Manpower',
        description: 'Minimize resource demands by automating standard test execution across systems.',
      },
      {
        title: 'Comprehensive Testing',
        description: 'Run single, grouped, and stress test scenarios with full support for MOCA, RF, and Web UI layers.',
      },
      {
        title: 'No Server Footprint',
        description: 'Eliminate the need for server installations with our serverless architecture.',
      },
    ],
    useCases: [
      {
        title: 'Blue Yonder WMS Upgrades',
        description:
          'Automate regression testing before and after upgrades to ensure critical business processes remain unaffected by new versions or patches.',
      },
      {
        title: 'New Warehouse Implementations',
        description:
          'Validate end-to-end workflows during initial deployments, ensuring that every system component, from RF devices to the Web UI, functions as expected.',
      },
      {
        title: 'Stress and Performance Validation',
        description:
          'Simulate concurrent user activity to assess how your WMS performs under peak loads, identifying bottlenecks before they impact operations.',
      },
      {
        title: 'Multi-Environment Testing',
        description:
          'Efficiently test across development, QA, and production environments with consistent, repeatable test cases.',
      },
    ],
    blogs: [
      { title: 'Enhancing Customer Experience through Blue Yonder Consulting', author: 'Saif Ali', date: 'July 1, 2024' },
      {
        title: 'The Risks of Manual Testing and the Shift to Blue Yonder WMS Automated Testing',
        author: 'Saif Ali',
        date: 'October 2, 2025',
      },
      {
        title: 'The Future of Warehouse Management with AI and Automation',
        author: 'Saif Ali',
        date: 'December 24, 2024',
      },
      {
        title: 'The Impact of Automation on Warehouse Management',
        author: 'Saif Ali',
        date: 'November 4, 2024',
      },
    ],
    faqs: [
      {
        q: 'Is AuTest compatible with my existing Blue Yonder infrastructure?',
        a: 'Yes, AuTest is designed to work with all Blue Yonder WMS systems and respects your existing infrastructure landscape. It integrates seamlessly with your current Blue Yonder setup.',
      },
      {
        q: 'What kind of support is available?',
        a: 'We offer 24/7 support for all AuTest users. Our support team consists of experienced Blue Yonder specialists who understand your challenges and can provide expert assistance.',
      },
      {
        q: 'How does Smart AuTest handle test data and environment isolation?',
        a: 'Tests execute within a secure, cloud-based framework with tenant-level data isolation. Metadata, test inputs, and execution results are stored separately for each tenant, ensuring clean separation of data between clients and environments.',
      },
      {
        q: 'Is any server-side installation required to use Smart AuTest?',
        a: 'No. AuTest is completely serverless. You only need to provide a valid URL to your target Blue Yonder WMS environment. Test execution and result storage occur securely in the cloud, eliminating any need for local infrastructure.',
      },
      {
        q: 'How does AuTest integrate with custom Blue Yonder components or extensions?',
        a: 'AuTest is designed to utilize both standard and customized JDA/BY components. Whether your tests touch core MOCA logic or custom-built workflows, you can plug them into AuTest for automated validation.',
      },
      {
        q: 'Can we use Smart AuTest for unit testing during development?',
        a: 'Yes. Smart AuTest includes a unit testing framework that enables developers and solution designers to validate MOCA logic or screen flows during build cycles, catching issues before they escalate.',
      },
      {
        q: 'How scalable is AuTest for enterprise-wide testing across multiple sites or teams?',
        a: 'AuTest is cloud-native, stateless, and scalable by design. Multiple teams across geographies can run tests simultaneously, manage their own test suites, and share reusable components making it suitable for enterprise-scale deployments.',
      },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: true,
    rating: 4.7,
    reviews: 38,
  },
  {
    id: 'rf-plus-plus',
    name: 'Smart RF Plus',
    category: 'Blue Yonder',
    shortDescription: 'Smart RF Plus: Blue Yonder RF Solution',
    description:
      'Smart RF Plus is an advanced Android-based enhancement for Blue Yonder WMS RF screens. Designed to work with your existing devices, it improves speed, usability, and functionality without requiring new hardware. From intuitive navigation to enriched data display, Smart RF Plus modernizes warehouse operations with a seamless, cost-effective upgrade.',
    valueProposition: [
      'Seamlessly supports mixed hardware environments, reducing the need for new device purchases.',
      'Leverage existing investments by modernizing older hardware with a new UI and extended capabilities.',
      'Bluetooth and sensor integrations make data capture smarter, faster, and more connected.',
      'Easily integrate product images, safety diagrams, and instructional videos directly into RF flows.',
      'Maintain native Blue Yonder screen structures for simplified upgrades and compliance.',
      'Eliminates reliance on physical buttons or F-keys with a touch-first interaction model.',
      'Avoid repeated device setup with one-time registration and auto-stuffing of Terminal IDs.',
      'Streamline operations with intuitive gesture-based navigation and quick screen switching.',
    ],
    features: [
      'Broad device compatibility across phones, tablets, and RF guns for flexible deployments.',
      'API-based connections to pull enriched data from Blue Yonder or external systems.',
      'Cleaner layouts and large touch targets reduce training time and user error.',
      'Ideal for large warehouses with rotating/shared devices—reduces configuration errors and support calls.',
    ],
    logo: '/assets/images/products-icons/RfPlus.png',
    image: '/assets/images/products/images/RF++/RF1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/rfplus/RFPromo.mp4', title: 'Promo' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/rfplus/RFDemo.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF1.png' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF2.png' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF1.gif', alt: 'Smart RF Plus demo' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF2.gif', alt: 'Smart RF Plus demo' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF3.gif', alt: 'Smart RF Plus demo' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF4.gif', alt: 'Smart RF Plus demo' },
    ],
    references: [
      { label: 'Barcodes', url: 'https://autoupdate.oracular.com/smartis/rfplus/RF-Barcodes.pdf', kind: 'pdf' },
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/rf/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/smartrf', kind: 'documentation' },
    ],
    cta: {
      primary: { label: 'Download Smart RF Plus', url: 'https://www.smart-is.com/what-we-do/smart-product/rf/' },
      secondary: { label: 'View Documentation', url: 'https://oracularis.github.io/smartrf' },
    },
    highlights: [
      { value: 'Boost Productivity', label: 'Streamlined workflows help teams complete tasks faster and with fewer errors' },
      { value: 'Lower Hardware Costs', label: 'Replace RF guns with affordable Android devices.' },
      { value: 'Visibility', label: 'Embed product images, videos, and details.' },
      { value: 'Compatible', label: 'Run on phones, tablets, or RF guns.' },
      { value: 'Multi-Protocol', label: 'Supports Mobile RF, Telnet, and SSH.' },
      { value: 'Secure by Design', label: 'Enterprise-grade security and auto-stuffing.' },
    ],
    keyFeatures: [
      {
        title: 'Broad Device Compatibility',
        summary:
          'Smart RF Plus runs flawlessly across a wide range of Android devices, including RF guns, smartphones, tablets, cameras, sensors, integrated scanners, and Bluetooth-enabled hardware.',
        bullets: [
          'Seamlessly supports mixed hardware environments, reducing the need for new device purchases.',
          'Leverage existing investments by modernizing older hardware with a new UI and extended capabilities.',
          'Bluetooth and sensor integrations make data capture smarter, faster, and more connected.',
        ],
      },
      {
        title: 'Rich Data and Media Integration',
        summary:
          'Bring more information to your operators without changing your core RF screens. Smart RF Plus enables the addition of images, videos, and external content directly into the user interface.',
        bullets: [
          'Easily integrate product images, safety diagrams, instructional videos, or supplier info.',
          'Pull data from Blue Yonder or any external system using API-based connections.',
          'Maintain native Blue Yonder screen structures for simplified upgrades and compliance.',
        ],
      },
      {
        title: 'Intuitive Gesture-Based Navigation',
        summary:
          'Smart RF Plus introduces gesture-based navigation—swipe left, right, up, or down to move between functions and screens, just like on a smartphone.',
        bullets: [
          'Eliminates reliance on physical buttons or F-keys, reducing device wear and tear.',
          'Streamline operations with quick screen switching, ideal for fast-paced environments.',
          'Delivers a modern UI experience that minimizes training time and maximizes ease of use.',
        ],
      },
      {
        title: 'One-Time Device Registration',
        summary:
          'Simplify the onboarding of new hardware with Smart RF Plus’s persistent device registration. Just enter the required information once per device, and Smart RF Plus handles the rest.',
        bullets: [
          'Avoid repeated entry of terminal IDs, usernames, or configuration parameters.',
          'Ideal for large warehouse environments with rotating or shared devices.',
          'Reduces configuration errors and support calls during new device rollout.',
        ],
      },
      {
        title: 'Touch-First Interaction Design',
        summary:
          'Designed for today’s touchscreen users, Smart RF Plus ensures every screen is optimized for taps, swipes, and touch gestures, making interaction feel natural and effortless.',
        bullets: [
          'Provides a mobile-like experience familiar to anyone using smartphones or tablets.',
          'Reduces cognitive load with clean layouts and large, easy-to-use touch targets.',
          'Boosts task speed and operator comfort in both standing and mobile workflows.',
        ],
      },
      {
        title: 'Auto-Stuffing for Terminal IDs',
        summary:
          'Smart RF Plus supports secure device registration and auto-stuffing patterns that reduce repetitive data entry and enforce consistency.',
        bullets: [
          'Auto-fill terminal/user details to speed up logins and reduce errors.',
          'Enterprise-grade security and governed access patterns.',
          'Designed for scalable, multi-site deployments.',
        ],
      },
    ],
    benefits: [
      {
        title: 'Lower Total Cost of Ownership',
        description:
          'Eliminates the need for expensive hardware upgrades or custom screen development, driving long-term cost savings.',
      },
      {
        title: 'Faster User Adoption',
        description:
          'Touch-friendly design and familiar mobile-like interactions reduce training time and improve user comfort on the floor.',
      },
      {
        title: 'Increased Workforce Productivity',
        description:
          'Operators spend less time navigating screens or entering data, completing tasks more quickly and with fewer interruptions.',
      },
      {
        title: 'Accelerated Time-to-Value',
        description:
          'Rapid deployment and easy device registration allow you to realize performance gains faster across warehouse operations.',
      },
      {
        title: 'Flexible Scalability',
        description:
          'Easily scale across multiple facilities and device types without rewriting screens or investing in new infrastructure.',
      },
      {
        title: 'Enhanced Operational Visibility',
        description:
          'Support for multimedia and extended data views empowers teams to make faster, better-informed decisions right from the RF screen.',
      },
    ],
    useCases: [
      {
        title: 'Legacy RF Modernization',
        description:
          'Upgrade outdated RF solutions without hardware replacement by enhancing functionality through Smart RF Plus.',
      },
      {
        title: 'Multimedia Support in Receiving & Inspection',
        description:
          'Enable teams to view product images, safety info, or inspection guidelines directly in RF screens, reducing lookup times.',
      },
      {
        title: 'Multi-Modal Scanning and Input Integration',
        description:
          'Combine traditional barcode scanning with camera and sensor inputs on one device, improving data accuracy.',
      },
      {
        title: 'Multi-Site Rollouts',
        description:
          'Standardize RF usability and performance across multiple warehouses with easy configuration and scalable deployment.',
      },
    ],
    blogs: [
      { title: 'Why Smart RF Plus is the Smartest Investment for Your Warehouse in 2025', author: 'Saif Ali', date: 'March 17, 2025' },
      { title: 'Transforming Warehouse Management with Smart RF Plus', author: 'Saif Ali', date: 'March 13, 2025' },
      {
        title: 'Smart RF Plus vs. Traditional RF Solutions for Warehouse Management Systems',
        author: 'Saif Ali',
        date: 'March 10, 2025',
      },
      {
        title: 'Can Your Current RF Terminal Emulator Keep Up with Today’s Warehouse Needs?',
        author: 'Saif Ali',
        date: 'September 18, 2025',
      },
    ],
    faqs: [
      {
        q: 'What devices are compatible with Smart RF Plus?',
        a: 'Smart RF Plus is built on the Android platform, ensuring compatibility with most modern Android devices. It also supports device-level extensions like cameras and sensors, allowing seamless integration for warehouse operations.',
      },
      {
        q: 'How is Smart RF Plus different from standard RF solutions?',
        a: 'Smart RF Plus is an Android-based enhancement for Blue Yonder RF that brings touch navigation, multimedia support, and seamless integration with modern devices, all without requiring changes to your existing infrastructure or hardware.',
      },
      {
        q: 'Do I need to purchase new hardware to use Smart RF Plus?',
        a: 'No. Smart RF Plus works with your existing Android RF guns, phones, tablets, scanners, cameras, and other Bluetooth-enabled devices. It enhances functionality without requiring hardware upgrades.',
      },
      {
        q: 'How does Smart RF Plus simplify device registration?',
        a: 'Smart RF Plus automatically determines the device ID and terminal ID through hardware settings, eliminating the need for manual input. Additionally, devices can be pre-registered using an SQL script to streamline the process.',
      },
      {
        q: 'Is Smart RF Plus compatible with my existing Blue Yonder WMS setup?',
        a: 'Yes. Smart RF Plus integrates natively with Blue Yonder WMS and supports both standard and custom RF screens. It operates using MOCA and respects your current security and configuration settings.',
      },
      {
        q: 'Can Smart RF Plus display multimedia or additional information on RF screens?',
        a: 'Yes. It allows you to embed images, videos, and contextual data from Blue Yonder or external sources directly within your RF screens, all without modifying standard screens.',
      },
      {
        q: 'Is Smart RF Plus secure for enterprise use?',
        a: 'Yes. It adheres to enterprise-grade security protocols, supports secure device registration, and ensures that terminal and user credentials are managed safely.',
      },
      {
        q: 'How does Smart RF Plus improve the user experience for warehouse staff?',
        a: 'With features like auto-filling login details, touch-based interaction, and visual enhancements, users find it easier to learn and faster to operate, reducing training time and minimizing errors.',
      },
      {
        q: 'Can Smart RF Plus scale across multiple warehouses or sites?',
        a: 'Yes. Its architecture supports multi-site deployment, allowing enterprises to maintain a consistent user experience and performance across locations with centralized management.',
      },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: false,
    rating: 4.6,
    reviews: 52,
  },
  {
    id: 'smart-viu',
    name: 'Smart Viu',
    category: 'Blue Yonder',
    shortDescription: 'Smart Viu: Blue Yonder Screen Development Solution',
    description:
      'Smart Viu is a no-code/low-code solution built exclusively for Blue Yonder WMS users, enabling effortless screen development without the need for Page Builder or technical expertise. With an intuitive interface, role-based access, and dynamic reporting, Smart Viu simplifies operations and allows users to create, manage, and visualize data with ease and precision.',
    valueProposition: [
      'No need for Page Builder, DDAs, or web development experience.',
      'Allows functional teams to own and manage their own reporting needs.',
      'Reduces development time and dependency on technical resources.',
      'Display multiple data outputs through a single deployable object.',
      'Centralized LES command management to tailor functionality.',
      'Interactive report viewing with actions directly from the Smart Viu interface.',
      'Role-based access control aligned with Blue Yonder configuration structure.',
      'Custom criteria highlighting and visual indicators to improve decision making.',
    ],
    features: [
      'Easily add, update, or delete LES commands and configure parameters/actions.',
      'Eliminate redundant Page Builder screen creation and reduce layout maintenance overhead.',
      'Assign visibility of reports and screens based on user roles to maintain compliance.',
      'Dynamic screen behavior tailored to user-defined logic.',
    ],
    logo: '/assets/images/products-icons/SmartViu.png',
    image: '/assets/images/products/images/SmartViu/SmartViu-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/smartviu/SmartViuMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/smartviu/SmartViu.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/SmartViu/SmartViu-1.png' },
      { type: 'image', src: '/assets/images/products/images/SmartViu/SmartViu-2.png' },
      { type: 'image', src: '/assets/images/products/images/SmartViu/SmartViu-3.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-viu/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/smartviu/#/./readme', kind: 'documentation' },
    ],
    cta: {
      primary: { label: 'Learn More', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-viu/' },
      secondary: { label: 'View Documentation', url: 'https://oracularis.github.io/smartviu/#/./readme' },
    },
    stats: [
      { value: '5,000+', label: 'Smart Viu Market Reach' },
      {
        value: '1 Year',
        label: 'Support',
        note: 'SmartViu comes with a comprehensive one-year support plan designed to assist you every step of the way.',
      },
      {
        value: '5+',
        label: 'Customers',
        note: 'The world’s leading companies use Smart Viu in their operations for no-code screen development and powerful reporting.',
      },
    ],
    highlights: [
      { value: '100%', label: 'Blue Yonder & Snowflake Compatible' },
      { value: '200%', label: 'Achieve ROI Faster' },
      { value: '86%', label: 'Boost Productivity Instantly' },
      { value: '70%', label: 'Slash Development Cost' },
    ],
    keyFeatures: [
      {
        title: 'Easy Screen Development',
        summary:
          'Smart Viu is built for warehouse teams to design and deploy screens independently, eliminating the need for technical expertise or development resources.',
        bullets: [
          'No need for Page Builder, DDAs, or web development experience',
          'Allows functional teams to own and manage their own reporting needs',
          'Reduces development time and dependency on technical resources',
        ],
      },
      {
        title: 'LES Command Management',
        summary:
          'SmartViu simplifies LES command configuration through a centralized maintenance screen, supporting custom actions and secure access control.',
        bullets: [
          'Easily add, update, or delete LES commands to tailor functionality.',
          'Configure detailed parameters and define actions like running reports or executing tasks.',
          'Centralized management for flexible, scalable command configurations.',
        ],
      },
      {
        title: 'One-Screen, Multiple Outputs',
        summary:
          'Streamline data access with a single screen that supports multiple layouts and datasets, removing the need for repeated screen development.',
        bullets: [
          'Display various data outputs through a single deployable object',
          'Eliminate redundant Page Builder screen creation',
          'Reduce complexity in managing layout changes and enhancements',
        ],
      },
      {
        title: 'Interactive Report Viewing',
        summary:
          'SmartViu offers an intuitive interface to browse, filter, and act on reports, enabling users to engage with live data without navigating complex systems.',
        bullets: [
          'View and manage reports created via LES commands',
          'Perform data actions directly from the SmartViu interface',
          'Dynamic screen behavior tailored to user-defined logic',
        ],
      },
      {
        title: 'Role-Based Access Control',
        summary:
          'Ensure that only the right people have access to the right information with flexible role-based access controls fully integrated with BY standards.',
        bullets: [
          'Assign visibility of reports and screens based on user roles',
          "Aligns with Blue Yonder's standard configuration structure",
          'Maintain security and compliance across all user levels',
        ],
      },
      {
        title: 'Key Dashboard Features',
        summary:
          'Transform the way you view data by highlighting key insights through customizable grid colouring making trends and outliers immediately visible.',
        bullets: [
          'Define custom criteria to highlight specific data values',
          'Improve decision-making through visual indicators',
          'Enhance readability and focus on actionable insights',
        ],
      },
    ],
    benefits: [
      {
        title: 'Faster Time-to-Value',
        description: 'Deploy custom data views rapidly and eliminate weeks of screen development effort.',
      },
      {
        title: 'Simplified Change Management',
        description: 'Adapt to evolving requirements without adding complexity to your environment.',
      },
      {
        title: 'Lower Operational Overhead',
        description: 'Reduce the time and cost associated with maintaining and updating custom screens.',
      },
      {
        title: 'Business-Led Control',
        description: 'Enable operations teams to manage and update screens without IT involvement.',
      },
      {
        title: 'Real-Time Visibility',
        description: 'Deliver always-updated, actionable data directly from Blue Yonder WMS.',
      },
      {
        title: 'Unified Interface',
        description: 'Consolidate multiple datasets into one intuitive view for faster decision-making.',
      },
    ],
    useCases: [
      {
        title: 'Rapid Deployment',
        description:
          'Deploy new warehouse reports instantly without coding or Page Builder, enabling faster response to changing operational data needs.',
      },
      {
        title: 'Role-Based Data Access',
        description:
          'Assign data access by role to maintain control, improve security, and ensure teams only see what they need.',
      },
      {
        title: 'Visual Monitoring of Warehouse KPIs',
        description:
          'Monitor warehouse KPIs using real-time visual grids and charts to quickly identify trends, bottlenecks, and performance gaps.',
      },
      {
        title: 'Centralizing Disparate Data Sources',
        description:
          'Consolidate multiple datasets into a single screen view, improving operational visibility and reducing screen-switching fatigue for users.',
      },
      {
        title: 'Business-Led Screen Management',
        description:
          'Let business users independently create or update screens, minimizing IT dependency and accelerating warehouse process optimization initiatives.',
      },
      {
        title: 'Minimizing Downtime',
        description:
          'Apply layout or logic changes without system disruption, ensuring updates happen smoothly without risking downtime or data loss.',
      },
    ],
    blogs: [
      {
        title: 'How SmartViu Enhances Blue Yonder Warehouse Management System’s Visibility',
        author: 'Saif Ali',
        date: 'August 5, 2024',
      },
      {
        title: 'Why Consulting Is a Core Component of Today’s Warehouse Management Projects',
        author: 'Saif Ali',
        date: 'August 6, 2025',
      },
      {
        title: 'From Strategy to Daily Operations: Smart IS’s Blue Yonder Solutions',
        author: 'Saif Ali',
        date: 'February 7, 2025',
      },
    ],
    faqs: [
      {
        q: 'Is SmartViu a Page Builder replacement or a different framework?',
        a: 'SmartViu is a custom framework inspired by Dynamic Data Applications (DDAs) but designed using modern, more advanced architecture.',
      },
      {
        q: 'Does SmartViu use REST APIs for its actions?',
        a: 'Yes, SmartViu utilizes REST APIs for its actions. It employs an action file to invoke MOCA commands, similar to the approach used by BY in their Standard Page Builder.',
      },
      {
        q: 'How does the backend of SmartViu differ from Page Builder and React screens?',
        a: 'SmartViu’s backend is built using the ExtJS Framework, a standard framework also employed by BY for its REFS systems. This enables a robust and scalable backend infrastructure.',
      },
      {
        q: 'How often do users export data for analysis, and how can this process be minimized?',
        a: 'This is a common practice, and Smart Viu’s conversational features can help streamline these tasks by providing actionable insights directly.',
      },
      {
        q: 'Is the Smart Warehouse Agent available for environments beyond Blue Yonder?',
        a: 'This can be explored based on the specific requirements of the organization.',
      },
      {
        q: 'Can the system create visualizations (e.g., pie charts) dynamically?',
        a: 'Yes, Smart Viu can generate dynamic visualizations based on user input and the available data.',
      },
      {
        q: "Are the chatbot's prompts predefined or dynamically generated?",
        a: 'The chatbot leverages large language models (LLMs) to generate insights dynamically based on the data. Prompts are not predefined or hardcoded, ensuring flexibility and adaptability.',
      },
      {
        q: 'Can chatbot access be restricted based on user roles?',
        a: 'Yes, access control can be implemented to ensure only authorized users have access to the AI capabilities.',
      },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: false,
    rating: 4.7,
    reviews: 44,
  },
  {
    id: 'warehouse-migrator',
    name: 'Warehouse Migrator',
    category: 'Blue Yonder',
    shortDescription: 'Accelerate Your Upgrades',
    description:
      'The Warehouse Migrator by Smart IS simplifies moving ID-based configuration data between environments with custom control files. It ensures hierarchy integrity and streamlines rollouts in SAS environments. With unmatched robustness and ease of use, it is the go-to solution for multi-environment businesses. Say goodbye to ID mismatches and hello to efficient configuration duplication.',
    valueProposition: [
      'Warehouse or subset duplication with just a few clicks',
      'Fits the new warehouse model offered by Blue Yonder',
      'A duplicate Warehouse can be made anytime without a call & in off hours.',
      'Effortless procedure saves you time.',
      'Secures data by providing backing up',
    ],
    features: [
      'User Defined and extensible Configuration',
      'Translate ID Values to Codes',
      'Load into Target Environment through an Extracted File',
      'Load into Target Environment using Roll-out',
      'Saving Extract Data as a Named data set',
      'Extracting & Loading a Subset of Data, and/ or as Functional Sets',
      'Convert WH_ID during Migration',
      'Directly Load data from one environment to another using Remote Call*',
    ],
    logo: '/assets/images/products-icons/WarehouseMigrator.png',
    image: '/assets/images/products/images/WarehouseMigrator/WarehouseMigrator-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/warehousemigrator/MigratorMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/warehousemigrator/WarehouseMigrator.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/WarehouseMigrator/WarehouseMigrator-1.png' },
      { type: 'image', src: '/assets/images/products/images/WarehouseMigrator/WarehouseMigrator-2.png' },
      { type: 'image', src: '/assets/images/products/images/WarehouseMigrator/WarehouseMigrator-3.png' },
      { type: 'image', src: '/assets/images/products/images/WarehouseMigrator/WarehouseMigrator-4.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/warehouse-migration-tool/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/warehousemigrator/#/', kind: 'documentation' },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: false,
    rating: 4.6,
    reviews: 35,
  },
  {
    id: 'smart-dda-converter',
    name: 'Smart DDA Converter',
    category: 'Blue Yonder',
    shortDescription: 'Why Reinvent the Wheel?',
    description:
      'The DDA Converter is designed for all Blue Yonder (BY) customers undergoing upgrades, seeking to effortlessly migrate DDAs to the new Web-GUI platform. With the BY 2017+, the Web UI does not allow for the simplicity and rich functionality of the DDAs. Our team embracing the challenge, provided an option for converting the DDAs developed in Fat Client to be ported as a Native Web UI screen.',
    valueProposition: [
      'The Conversion process is straight forward and quick.',
      'Flexible to your warehouse needs.',
      'User can easily switch between Fat Client & web screens.',
      'Testing and training time is reduced.',
    ],
    features: [
      'Upgrade all the existing DDAs to the Web, utilizing the DDA Converter.',
      'The same look and feel are now available in the Web GUI.',
      'Post-Upgrade, or a new implementation',
      'Develop a new DDA in the Fat Client.',
      'Once the DDA is fully tested in the Fat Client, you can employ the Smart DDA Web Converter to convert the DDA.',
      'Once conversion is successful, the DDA is available in the target environment.',
    ],
    logo: '/assets/images/products-icons/SmartDDA.png',
    image: '/assets/images/products-icons/SmartDDA.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/DDAMarketing.mp4', title: 'Marketing' },
      { type: 'image', src: '/assets/images/products-icons/SmartDDA.png', alt: 'Smart DDA Converter' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/dda', kind: 'product-page' },
      { label: 'Digital Brochure', url: 'https://www.smart-is.com/wp-content/uploads/2024/05/DDA-converter.pdf', kind: 'pdf' },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: false,
    rating: 4.5,
    reviews: 28,
  },
  {
    id: 'smart-j-board',
    name: 'Smart J-Board',
    category: 'Blue Yonder',
    shortDescription: 'Your Blue Yonder (BY) Dashboards Revitalized',
    description:
      'Now your Warehouse KPIs are easily accessible and easy to understand for your entire team. Smart J-Board customizes BY Dashboards and brings them to big screens and empowers users to allow them to make better, more informed decisions.',
    valueProposition: [
      'A secure system that relies on the MOCA security layer.',
      'A central control system comprised of background statistics of all warehouse areas.',
      'Allows Supervisors to easily view KPIs to make informed decisions.',
      'Easily customizable to your warehouse needs.',
    ],
    features: [
      'Compatibility across devices, built on Microsoft Windows platform.',
      'Provides visual representation of rapidly changing data, for example the Work Queue.',
      'Centralized control with automated device registration.',
      'Customizable displays for tailored information.',
      'Dynamic data representation, including real-time statistics and navigation automation.',
      'For Blue Yonder 2017+ versions, drive existing screens in a dashboard.',
      'Enhanced content integration, such as localized weather and internal announcements.',
    ],
    logo: '/assets/images/products-icons/Smart-J-Board.png',
    image: '/assets/images/products/images/JBoard/JBoard-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/SmartJBoardMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/JBoard.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/JBoard/JBoard-1.png' },
      { type: 'image', src: '/assets/images/products/images/JBoard/JBoard-2.png' },
      { type: 'image', src: '/assets/images/products/images/JBoard/JBoard-3.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-j-board/', kind: 'product-page' },
      { label: 'Digital Brochure', url: 'https://www.smart-is.com/wp-content/uploads/2024/05/J-Board-1.pdf', kind: 'pdf' },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: false,
    rating: 4.7,
    reviews: 45,
  },
  {
    id: 'oogy',
    name: 'OOGY',
    category: 'Blue Yonder',
    shortDescription: 'Seamlessly Integrate',
    description:
      'The Oracular Open Gateway (OOGY) offers a stand-alone web-service that enables access to the MOCA layer through standard HTTP based APIs. It provides an integration layer between the BY MOCA layer and any in-house or 3rd party application by exposing MOCA commands via API. Because it is written in Java, you can host the web-service on any OS.',
    valueProposition: [
      'Enables End-to-End Visibility',
      'Boosts Efficiency',
      'Real-Time Data Exchange',
      'API Swagger',
      'Resolved Version Compatibility issues for many clients for AGVs (Automated guided vehicle) and API routing.',
      'A single web-service for multiple Blue Yonder Instances.',
      'Create and integrate existing and new applications with data from your BY WMS instances.',
      'Super Compatible with all Java versions till Version 17.',
    ],
    features: [
      'The Oracular Open Gateway (OOGY) offers a stand-alone web-service that enables access to the MOCA layer through standard HTTP based APIs.',
      'It provides an integration layer between the BY MOCA layer and any in-house or 3rd party application by exposing MOCA commands via API.',
      'Because it is written in Java, you can host the web-service on any OS.',
    ],
    logo: '/assets/images/products-icons/Oogy.png',
    image: '/assets/images/products/images/OOGY/Oogy-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/oogy/OOGYMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/oogy/Oogy.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/OOGY/Oogy-1.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/oracular-open-gateway-oogy/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/oogy', kind: 'documentation' },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: true,
    rating: 4.8,
    reviews: 61,
  },
  {
    id: 'smart-devops',
    name: 'Smart DevOps',
    category: 'Blue Yonder',
    shortDescription: 'Simplified Deployments',
    description:
      'In enterprise systems like BY WMS, managing development and configuration changes effectively is essential for ensuring stability and operational efficiency. Smart DevOps is a purpose-built application that simplifies and formalizes the change management process by tracking both code and data changes, enabling a controlled rollout process, and supporting modern DevOps practices.',
    valueProposition: [
      'One comprehensive toolset and methodology.',
      'Works with industry standard tools like JIRA, GIT, etc.',
      'Supports REFS development.',
      'All Development activities and configurations are tracked',
      'Rollout Builder builds the rollout in standard BY methodology for easy deployment.',
    ],
    features: [
      'Track all changes in the BY-WMS environment.',
      'Hide the complexity of the BY Data model from the developer or the functional user making the change.',
      'Repeatable process, to reduce manual export errors from a user',
      'End to end management from making the change to managing the data extraction to committing to a repository to building a rollout.',
    ],
    logo: '/assets/images/products-icons/Devops.png',
    image: '/assets/images/products/images/Devops/Devops-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/devops/DevopsMarketing.mp4', title: 'Marketing' },
      { type: 'image', src: '/assets/images/products/images/Devops/Devops-1.png' },
      { type: 'image', src: '/assets/images/products/images/Devops/Devops-2.png' },
      { type: 'image', src: '/assets/images/products/images/Devops/Devops-3.png' },
      { type: 'image', src: '/assets/images/products/images/Devops/Devops-4.png' },
    ],
    references: [
      { label: 'DevOps (Explanation)', url: 'https://v0-devops-cycle-explanation.vercel.app/', kind: 'other' },
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-devops/', kind: 'product-page' },
      { label: 'Digital Brochure', url: 'https://www.smart-is.com/wp-content/uploads/2024/05/Smart-Devops.pdf', kind: 'pdf' },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: true,
    rating: 4.8,
    reviews: 58,
  },
  {
    id: 'smart-training-portal',
    name: 'Smart Training Portal',
    category: 'Microsoft',
    shortDescription: 'Trained Smarter',
    description:
      'Smart Training Portal is envisioned to simplify user training by covering almost all scenarios of the BY WMS Application. This allows admins to set up training scenarios of the selected process as a new use case which is a super flexible and adaptable solution for any enterprise.',
    valueProposition: [
      'A public web page where user will provide User ID and select the process for training.',
      'Ability to Create User in BY and Assign Training to him. Based on assigned training process create required data in BY.',
      'Users will get a pdf file or link to pdf file which will contain required information like User ID , password, training data and link to server etc.',
      'Ability to purge training data for user once he has completed the training.',
      'Users will get a PDF report containing their training data and summary.',
    ],
    features: [
      'Training Data Creation & Maintenance',
      'Process the training on BY system',
      'Web-based and easily accessible app',
      'Utilize Sample WMS data for user training',
      'GUI-based maintenance of training process use cases',
    ],
    logo: '/assets/images/products-icons/SMP.png',
    image: '/assets/images/products/images/TrainingPortal/TrainingPortal-1.png',
    media: [
      { type: 'image', src: '/assets/images/products/images/TrainingPortal/TrainingPortal-1.png' },
      { type: 'image', src: '/assets/images/products/images/TrainingPortal/TrainingPortal-2.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-training-portal/', kind: 'product-page' },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: false,
    rating: 4.6,
    reviews: 39,
  },
  {
    id: 'smart-rule-engine',
    name: 'Smart Rule Engine',
    category: 'Blue Yonder',
    shortDescription: 'A mod to end all mods!',
    description:
      'Rule Engine automates your workflows, reduces manual effort, and enhances operational efficiency. It provides a robust, customizable framework to define and manage conditional logic without complex modifications.',
    valueProposition: [
      'Streamlines repetitive tasks by automating “if this, then do that” logic.',
      'Enables non-technical teams to tweak system behavior without deep coding.',
      'Improves system performance and reduces maintenance overhead.',
      'Supports real-time decision-making through condition-based rules.',
      'Consolidates large, complex configurations into simpler rule sets.',
      'Enhances auditability and traceability of decisions and actions.',
    ],
    features: [
      'Condition-Based Rules – Evaluate conditions and execute workflows or actions.',
      'Drive decisions through easy-to-update tables.',
      'Efficiently finding mapped values.',
      'Automate business logic and trigger system behaviors.',
      'Replace thousands of configurations with compact, reusable rules.',
      'Trigger reports, call APIs, or connect external systems based on rules.',
    ],
    logo: '/assets/images/products-icons/SmartRuleEngine.png',
    image: '/assets/images/products/images/SmartRuleEngine/SmartRuleEngine-1.png',
    media: [
      { type: 'image', src: '/assets/images/products/images/SmartRuleEngine/SmartRuleEngine-1.png' },
      { type: 'image', src: '/assets/images/products/images/SmartRuleEngine/SmartRuleEngine-2.png' },
    ],
    references: [],
    price: 'Contact for pricing',
    specs: {},
    isNew: false,
    rating: 4.7,
    reviews: 51,
  },
  {
    id: 'smart-assistant',
    name: 'Smart Assistant',
    category: 'Microsoft',
    shortDescription: 'AI Chat Portal',
    description:
      "Smart Assistant, an innovative web application crafted to put the power of personalized virtual assistants in your hands. Users can easily input instructions and provide relevant documentation to enhance the assistant's knowledge base, ensuring it delivers precise and contextually relevant responses. Whether you need assistance with scheduling, data analysis, customer support, or any other task, Smart Assistant is equipped to handle it all.",
    valueProposition: [
      'Enhances productivity in fast-paced business environments by providing efficient task management and prompt information retrieval through a virtual assistant.',
      'Empowers businesses with tailored virtual assistants, offering personalized assistance tailored to their unique need.',
      'Enables effective knowledge management by allowing documentation uploads and instruction definitions, enhancing virtual assistant capabilities and accuracy for businesse.',
      'Elevates customer experience with its conversational interface, delivering prompt, accurate assistance to drive real-time engagement and enhance customer satisfaction for businesses.',
      "Businesses gain a competitive edge with Smart Assistant, leveraging advanced technology to streamline operations, enhance productivity, and deliver superior customer service, staying ahead in today's dynamic digital landscape",
    ],
    features: [
      'Customization: Smart Assistant allows users to tailor their virtual assistant by defining specific instructions and uploading relevant documentation to ensure accurate and personalized responses.',
      'Information Retrieval: The assistant efficiently handles diverse information retrieval tasks, such as document analysis and query resolution, to help users find answers quickly and accurately.',
      'Conversational Interface: Smart Assistant provides a natural conversational experience, enhancing user interaction and ensuring seamless communication with the virtual assistant.',
      'Documentation Integration: Users can upload relevant documents for the assistant to reference, enabling it to provide accurate responses based on the available information.',
      'Streamlined Productivity: By aiding in task management, swiftly retrieving information, and facilitating smooth communication, Smart Assistant empowers users to work more efficiently and effectively.',
    ],
    logo: '/assets/images/products-icons/SmartAssistant.png',
    image: '/assets/images/products/images/SmartAssistant/SmartAssistant-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/smartassistant/SmartAssistantDemo.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/SmartAssistant/SmartAssistant-1.png' },
      { type: 'image', src: '/assets/images/products/images/SmartAssistant/SmartAssistant-2.png' },
      { type: 'image', src: '/assets/images/products/images/SmartAssistant/SmartAsisstant-3.png' },
      { type: 'image', src: '/assets/images/products/images/SmartAssistant/SmartAssistant-4.png' },
    ],
    references: [
      { label: 'Qr Codes', url: 'https://autoupdate.oracular.com/smartis/smartassistant/Assistant-Demo-QR-Codes.pdf', kind: 'pdf' },
      { label: 'Smart Assistant', url: 'https://v0-smart-assistant-design.vercel.app/', kind: 'other' },
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-assistant/', kind: 'product-page' },
    ],
    price: 'Contact for pricing',
    specs: {},
    isNew: true,
    rating: 4.8,
    reviews: 67,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew)
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map(p => p.category))).sort()
}
