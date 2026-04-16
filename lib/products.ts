export type ProductMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; title?: string }

export type ProductReference = {
  label: string
  url: string
  kind?: 'product-page' | 'documentation' | 'pdf' | 'other'
}

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
}

/**
 * NOTE: This file is the migrated “source of truth” from:
 * DigitalBYSite/src/Modules/SmartProducts/ProductsDetails.js
 */
export const products: Product[] = [
  {
    id: 'moca-client',
    name: 'MOCA Client',
    category: 'Blue Yonder',
    shortDescription: 'Supercharge Development',
    description:
      'MOCA Client is an intuitive, all-in-one Blue Yonder development tool for accessing, prototyping, and troubleshooting Blue Yonder applications. It features multi-tab navigation, built-in security, integrated change management, and robust audit trails—helping developers work efficiently at the MOCA Command level.',
    valueProposition: [
      'A modern, intuitive UI designed for both beginners and experienced developers.',
      'Intelligent auto-complete, keyboard shortcuts, and context-aware recommendations for streamlined query writing.',
      'Effortlessly edit, save, and reuse commands with built-in history tracking to improve workflow efficiency.',
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
    image: '/assets/images/products/images/MocaClient/MocaClient-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/mocaclient/MocaMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/mocaclient/MocaClient-Video-1.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/MocaClient-1.png' },
      { type: 'image', src: '/assets/images/products/images/MocaClient/MocaClient-2.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/smart-is-moca-client/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/mocaclient/', kind: 'documentation' },
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
    shortDescription: 'Testing Done Right',
    description:
      'AuTest is an automated testing solution designed to streamline and automate the testing of WMS use cases for Blue Yonder WMS users—reducing manual intervention while improving confidence and speed across release cycles.',
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
    image: '/assets/images/products/images/AuTest/Autest-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/autest/AutestMarketing.mp4', title: 'Marketing' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/autest/AutestDemo.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest-1.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest-2.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest-3.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest-4.png' },
      { type: 'image', src: '/assets/images/products/images/AuTest/Autest-5.png' },
    ],
    references: [
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/autest/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/autest', kind: 'documentation' },
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
    shortDescription: 'Modern RF Enhancements',
    description:
      'Smart RF Plus is an advanced Android-based enhancement for Blue Yonder WMS RF screens. Designed to work with your existing devices, it improves speed, usability, and functionality without requiring new hardware—modernizing warehouse operations with a seamless, cost-effective upgrade.',
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
    image: '/assets/images/products/images/RF++/RF-1.png',
    media: [
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/rfplus/RFPromo.mp4', title: 'Promo' },
      { type: 'video', src: 'https://autoupdate.oracular.com/smartis/rfplus/RFDemo.mp4', title: 'Demo' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF-1.png' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF-2.png' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF-3.png' },
      { type: 'image', src: '/assets/images/products/images/RF++/RF-4.png' },
    ],
    references: [
      { label: 'Barcodes', url: 'https://autoupdate.oracular.com/smartis/rfplus/RF-Barcodes.pdf', kind: 'pdf' },
      { label: 'Product Page', url: 'https://www.smart-is.com/what-we-do/smart-product/rf/', kind: 'product-page' },
      { label: 'Documentation', url: 'https://oracularis.github.io/smartrf', kind: 'documentation' },
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
    shortDescription: 'No-code Screen Development',
    description:
      'Smart Viu is a no-code/low-code solution built exclusively for Blue Yonder WMS users, enabling effortless screen development without Page Builder or technical expertise. With an intuitive interface, role-based access, and dynamic reporting, Smart Viu helps teams create, manage, and visualize data with ease and precision.',
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
