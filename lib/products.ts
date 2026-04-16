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
    shortDescription: 'Turbocharge Development',
    description:
      'Developers need to be empowered with a development tool that can overcome the challenges that each client’s infrastructure landscape may present. Smart IS created a tool that allows for accessing the environment at the MOCA Command Level. MOCA Client can perform several tasks in the most efficient manner possible.',
    valueProposition: [
      'The developer can access environments through a multi-tab layout making it easy to navigate between them.',
      'Data tools to easily manage and manipulate data.',
      'Wizards for everything a developer needs, from developing a command, to an RDT screen to labels etc.',
      'Label renderer to be able to view the generated Out-files.',
      'Enhanced paid tools for increased functionality.',
    ],
    features: [
      'A Single Tool/Interface for Development, Prototyping, Troubleshooting and building Applications.',
      'Provides Development Aids like command development, RF screen development, search tools within commands and algorithms etc.',
      'Provide Access to the Application Server through MOCA Layer to avoid the need for accessing the application server directly via telnet or remote desktop.',
      'Build Change Management into the DNA of the Application so this tool can face any audit challenges.',
      'Security is built in, so only developers with proper access in each environment can connect.',
      'Enterprise level controls can be imposed like forcing a minimum application version.',
      'Audit log of every command executed to present to an external auditor if needed.',
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
    shortDescription: 'Automated Testing Done Right',
    description:
      'Introducing Smart AuTest, the Automated Testing Solution that allows JDA/Blue Yonder (BY) users to automate their tests with full control. From stress testing to integration testing to performance testing, AuTest will prepare you for anything and everything that is in your warehouse implementation scope.',
    valueProposition: [
      'Ability to perform Web-GUI, RF and MOCA based test cases, in any combination.',
      'Ability to perform Directed Work based test cases.',
      'Can perform all tests including single, group and stress tests.',
      'Comes prepackaged with your day-to-day tests.',
      'Requires fewer people working on the same task.',
      'Highly reusable and scalable',
      'No server footprint is required.',
      'Frees up time for users.',
      'Allows for quick JDA/BY solutions.',
      'Faster client support',
    ],
    features: [
      'Provides a flexible and feature rich testing platform.',
      'Utilizes JDA/BY components and customizations along with the application component to create, manage and run automated tests.',
      'Can run any test scenario whether it is on the Web, GUI, or the RF.',
      'AuTest is unique in the current testing landscape where no server components need to be installed.',
      'Cloud based test cases that can be executed by providing a URL to the target WMS.',
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
    id: 'rf-plus-plus',
    name: 'RF++',
    category: 'Blue Yonder',
    shortDescription: 'Taking your RF Screens to the Next Level',
    description:
      'All JDA/ Blue Yonder (BY) WMS implementations need an RF Solution - a solution for the physical devices that are used on the floor to perform most of the warehouse functions. Smart IS’s RF++ application provides several enhancements for your existing RF screens.\nWe provide an Android app that builds on top of the standard JDA/ BY solution, thus providing support for delivered, as well as custom RF screens without any extra work.',
    valueProposition: [
      'Builds on Existing BY Solution',
      'Additional information can be integrated.',
      'Eases System Support.',
      'Reduces the Need for Developers.',
      'Improved User Experience.',
      'Adds Contextual Information.',
      'Screen Layout Enhancements and Touch Support.',
      'Simplified system interaction by simplifying access to the function keys.',
    ],
    features: [
      'Easy to connect – Simplify the administrative aspect like adding new devices.',
      'Touch Support – Easy for screen interaction with more options.',
      'Screen Layout – Utilize additional space if available and provide multi-tab options.',
      'Additional Information – Contextual information can be made available.',
      'Voice Support – Natively support the voice capability of the device if available.',
      'Simplified deployment architecture for the enterprise.',
      'Out-of-box compatibility with device level extensions like Camera and other sensors.',
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
    id: 'smart-viu',
    name: 'Smart Viu',
    category: 'Blue Yonder',
    shortDescription: 'Data Anywhere, Anytime',
    description:
      'Smart Viu tackles the challenge of meeting user demands for data in BY-WMS by offering a single deployable object capable of displaying multiple data outputs. This eliminates the need for creating numerous custom Page Builder screens, streamlining development, and reducing change management complexities. With Smart Viu, organizations can develop various data layouts without adding new screens, while still supporting Master/Detail layouts and actions on selected data. Overall, Smart Viu enhances usability and efficiency, ensuring users have access to the information they need without overwhelming screen development and management.',
    valueProposition: [
      'One screen to end the need for any more screen development.',
      'Color coded grid based on user driven rules.',
      'Chart renderings.',
    ],
    features: [
      'One-screen deployment, with the ability to display any dataset.',
      'Ability to configure and perform actions on the selected data.',
      'Ability to render data as Master/ Child in a Multi-Tab layout.',
      'Ability to render data as charts.',
      'Embedded security layer to control which data outputs can be viewed by which users.',
      'Smart Chat widget',
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
