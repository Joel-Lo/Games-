const wordList =  [
    {
        word: "Cybersecurity",
        hint: "Ongoing effort to protect individuals, organizations and governments from digital attacks by protecting networked systems and data from unauthorized use or harm"
    },
    {
        word: "Personal",
        hint: "Identity, personal data and computing devices"
    },
    {
        word: "Organisational",
        hint: "Everyone's responsibility to protect the organisation reputation, data and customers"
    },
    {
        word: "Government",
        hint: "National security, economic stability and safety and wellbeing of citizens is at stake"
    },
    {
        word: "Offline",
        hint: "Real life persona that you present on a daily basis at home, school, work"
    },
    {
        word: "Online",
        hint: "How you present yourself to others online"
    },
    {
        word: "Transactional data",
        hint: "Details in relation with buying, selling, production activities and basic organisational operations"
    },
    {
        word: "Intellectual property",
        hint: "Patents, trademarks, new product plans that allows an organisation to gain economic advantage"
    },
    {
        word: "Financial data",
        hint: "Income statements, balance sheets, cash flow statements"
    },
    {
        word: "IoT",
        hint: "Internet of things, a large network of physical objects"
    },
    {
        word: "Confidentiality",
        hint: "Set of rules that prevents sensitive information from being disclosed to unauthorized people, resources and processes"
    },
    {
        word: "Integrity",
        hint: "System information or processes are protected from intentional or accidental modification"
    },
    {
        word: "Availability",
        hint: "Authorized users are able to access systems and data when and where needed and those that do not meet established conditions, are not"
    },
    {
        word: "Processing",
        hint: "Data that is being used to perform an operation"
    },
    {
        word: "Storage",
        hint: "Data stored in memory or on a permanent storage device"
    },
    {
        word: "Transmission",
        hint: "Data traveling between information systems"
    },
    {
        word: "Reputational damage",
        hint: "Security breach conesequence that affects an organisation, long term"
    },
    {
        word: "Vandalism",
        hint: "Security breach consequence that results fom hackers posting untrue information"
    },
    {
        word: "Theft",
        hint: "Security breach consequence that involve stealing sensitive personal data"
    },
    {
        word: "Loss of revenue",
        hint: "Security breach consequence that has a devastating financial impact"
    },
    {
        word: "Damaged intellectual property",
        hint: "Security breach consequence that have a devastating impact on competitiveness of an organisation"
    },
    {
        word: "Security breach",
        hint: "Incident that results in unauthorized access to data, applications, services or devices, exposing private information that attackers can use for financial gain or other advantages"
    },
    {
        word: "Script kiddies",
        hint: "Amateurs hackers who are inexperienced and use existing tools found on the internet to launch attacks"
    },
    {
        word: "Hackers",
        hint: "Attackers break into computer systems or networks to gain access"
    },
    {
        word: "White hat attackers",
        hint: "Break into network or computer systems to identify any weaknesses to improve the security of it"
    },
    {
        word: "Gray hat attackers",
        hint: "Find vulnerabilities in a system and report their findings to the owners of a system if doing so coincides with their agenda else sell it to other attackers"
    },
    {
        word: "Black hat attackers",
        hint: "Take advantage of any vulnerability for illegal personal, financial or political gain"
    },
    {
        word: "Organised hackers",
        hint: "Hacktivists and state sponsered hackers"
    },
    {
        word: "Cyberwarfare",
        hint: "Use of technology to penetrate and attack another nation’s computer systems and networks in an effort to cause damage or disrupt services"
    },
    {
        word: "Spyware",
        hint: "Monitors your online activity and log every key you press on your keyboard"
    },
    {
        word: "Adware",
        hint: "Installed with some versions of software and is designed to automatically deliver advertisements to a user"
    },
    {
        word: "Backdoor",
        hint: "Gain unauthorized access by bypassing the normal authentication procedures to access a system"
    },
    {
        word: "Ransomware",
        hint: "Hold a computer system or the data it contains captive until a payment is made"
    },
    {
        word: "Scareware",
        hint: "Consists of operating system style windows that pop up to warn you that your system is at risk and needs to run a specific program for it to return to normal operation"
    },
    {
        word: "Rootkit",
        hint: "Modify the operating system to create a backdoor to access your computer remotely"
    },
    {
        word: "Virus",
        hint: "Replicates and attaches itself to other executable files by inserting its own code when excuted"
    },
    {
        word: "Trojan horse",
        hint: "Carry out malicious operations by masking its true intent to exploit your user privileges"
    },
    {
        word: "Worms",
        hint: "Replicates itself to spread from one computer to another which runs by themselves"
    },
    {
        word: "Social engineering",
        hint: "Manipulation of people into performing actions or divulging confidential information"
    },
    {
        word: "Pretexting",
        hint: "An attacker calls an individual and lies to them in an attempt to gain access to privileged data"
    },
    {
        word: "Tailgating",
        hint: "An attacker quickly follows an authorized person into a secure, physical location"
    },
    {
        word: "Something for something",
        hint: "An attacker requests personal information from a person in exchange for something"
    },
    {
        word: "Denial of service",
        hint: "A type of network attack that is relatively simple to carry out, resulting in some sort of interruption of network service to users, devices or applications"
    },
    {
        word: "Distributed denial of service",
        hint: "A type of network attack that is relatively simple to carry out but originate from multiple, coordinated sources"
    },
    {
        word: "Botnet",
        hint: "A group of bots, connected through the Internet, that can be controlled by a malicious individual or group"
    },
    {
        word: "On path attackers",
        hint: "Intercept or modify communications between two devices to collect information from or to impersonate one of the devices"
    },
    {
        word: "Man in the middle",
        hint: "A cybercriminal takes control of a device without the user's knowledge to intercept and capture user information to send to its intended destination"
    },
    {
        word: "Man in the mobile",
        hint: "Used to take control of a user's mobile device to exfiltrate user sensitive information to send to attackers"
    },
    {
        word: "Advanced persistent threats",
        hint: "Multi phase, long term, stealthy and advanced operation against a specific target"
    },
    {
        word: "Security vulnerability",
        hint: "Any kind of software or hardware defect"
    },
    {
        word: "Exploit",
        hint: "Program to take advantage of a known vulnerability"
    },
    {
        word: "Meltdown",
        hint: "Reading memory from a given system"
    },
    {
        word: "Spectre",
        hint: "Data handled by other applications"
    },
    {
        word: "Side channel attacks",
        hint: "Information gained from the implementation of a computer system"
    },
    {
        word: "Buffer overflow",
        hint: "A software vulnerability where data is written beyond the limits of the memory areas allocated to an application"
    },
    {
        word: "Non validated input",
        hint: "A software vulnerability where programs require a data input which can contain malicious content so it behave in an unintended way"
    },
    {
        word: "Race conditions",
        hint: "A software vulnerability where the output of an event which depends on ordered or timed inputs does not occur in the current order or at the proper time"
    },
    {
        word: "Weaknesses in security practices",
        hint: "A software vulnerability where sensitive data and system is not protected properly when developers try to create their own security algorithms"
    },
    {
        word: "Access control problems",
        hint: "A software vulnerability where the process of controlling who does what which ranges from managing physical access to equipment to dictating who has access to a resource has issues"
    },
    {
        word: "Software updates",
        hint: "Released by operating system produces to patch and repair software vulnerabilities to avoid exploitation"
    },
    {
        word: "Cryptocurrency",
        hint: "Digital money that can be used to buy goods and services using strong encryption techniques to secure online transactions"
    },
    {
        word: "Cryptojacking",
        hint: "Hides on a user electronic devices or servers to mine cryptocurrencies without the consent and knowledge of the user"
    },
    {
        word: "Password spraying",
        hint: "An attempt to gain access to a system by using commonly used passwords across many accounts"
    },
    {
        word: "Dictionary attacks",
        hint: "The hacker will systematically try every word in a dictionary or a list of commonly used words as a password to break into the account"
    },
    {
        word: "Brute force attacks",
        hint: "Simplest way of gaining access to a password protected site by using any possible combinations in the password until they get access to it"
    },
    {
        word: "Rainbow attacks",
        hint: "Dictionary of precomputed hashes and the passwords from which they were calculated"
    },
    {
        word: "Traffic interception",
        hint: "Plain text or unencrypted passwords can be read easily by intercepting communications"
    },
    {
        word: "Online security",
        hint: "Necessary steps to prevent personal information from falling into the wrong hands"
    },
    {
        word: "Firewall",
        hint: "Protects devices from unauthorised access"
    },
    {
        word: "Encryption",
        hint: "Process of converting information into a form in which unauthorised parties cannot read"
    },
    {
        word: "Back up",
        hint: "Helps prevent loss of irreplaceable data"
    },
    {
        word: "Home network",
        hint: "Stores your data locally with total control"
    },
    {
        word: "Secondary location",
        hint: "Copy data to network attached storage device, hard or thumb drive"
    },
    {
        word: "Cloud",
        hint: "Another method to back up data but cost depends on storage needed and be more selective of the data"
    },
    {
        word: "Terms of service",
        hint: "Includes a nmber of sections from user rights and responsibilities to disclaimers and account modification terms"
    },
    {
        word: "Two Factor Authentication",
        hint: "Adds an extra layer of security for account logins and require a second token such s biometric scan and verification code to verify identity"
    },
    {
        word: "Open authorisation",
        hint: "Open standard protocal that allows you to use your credentials to access thrid party applications without exposing your password"
    },
    {
        word: "Security applications",
        hint: "Standalone devices that run on a network device"
    },
    {
        word: "Routers",
        hint: "Interconnects various network segments together while providing traffic filtering capabilities"
    },
    {
        word: "Intrusion prevention systems",
        hint: "Set of traffic signatures that match and block malicious traffic and attacks"
    },
    {
        word: "Virtual private networks",
        hint: "Uses a secure encrypted tunnel from a mobile computer and securely connect back to the organisation network"
    },
    {
        word: "Antimalware",
        hint: "Use signatures or behavioral analysis of applications to identify and block malicious code from being executed"
    },
    {
        word: "Network layer firewall",
        hint: "A firewall that filter communications based on source and destination IP addresses"
    },
    {
        word: "Transport layer firewall",
        hint: "A firewall that filter communications based on source and destination data ports"
    },
    {
        word: "Application layer firewall",
        hint: "A firewall that filter communications based on an application, program or service"
    },
    {
        word: "Context aware layer firewall",
        hint: "A firewall that filter communications based on the user, device, role, application type and threat profile"
    },
    {
        word: "Proxy server",
        hint: "A firewall that filter web content requests"
    },
    {
        word: "Reverse proxy server",
        hint: "A firewall that is placed in front of web servers to protect, hide, offload and distribute access to web servers"
    },
    {
        word: "Network address translation firewall",
        hint: "A firewall that hides or masquerades the private addresses of network hosts"
    },
    {
        word: "Host based firewall",
        hint: "A firewall that filters ports and system service calls on a single computer operating system"
    },
    {
        word: "Intrusion detection systems",
        hint: "Dedicated network device that scans data against a database of rules or attack signatures to look for malicious traffic"
    },
    {
        word: "Intrusion prevention systems",
        hint: "Block or deny traffic based on a positive rule or signature match"
    },
    {
        word: "Secure operations center team",
        hint: "Gather more accurate and actionable data"
    },
    {
        word: "Incidence response team",
        hint: "Access to forensically sound information to quickly analyse and understand suspicious behaviours"
    },
    {
        word: "Threat intelligence team",
        hint: "Proactively improve the security infrastructure of the organisation"
    },
    {
        word: "Security infrastructure engineering team",
        hint: "Consume and act on threat information faster"
    },
    {
        word: "Behavior based security",
        hint: "Form of threat detection that involve capturing and analysing the flow of communication between a user on the local network and a local/remote destination"
    },
    {
        word: "Honeypots",
        hint: "Network administrator lures attacker in by appealing to their predicted pattern of malicious behaviour before capturing, logging and analysing the attacker behaviour to build a better defence"
    },
    {
        word: "NetFlow",
        hint: "Gather information about data flowing through a network"
    },
    {
        word: "Penetration testing",
        hint: "Act of assessing a computer system, network or organisation for security vulnerabilities to breach systems, people, processes and code to uncover unexploitable vulnerabilities to improve the system defences"
    },
    {
        word: "Risk management",
        hint: "Formal process of continuously identifying and assessing risk to reduce impact of threats and vulnerabilities"
    }
];
