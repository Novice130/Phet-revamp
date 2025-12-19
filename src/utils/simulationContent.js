// Utilities for generating relevant learning content per simulation.
// Goal: avoid hand-editing the huge simulations.json while keeping per-simulation quiz/questions/resources relevant.

import realLifeImages from "../data/realLifeImages.json";

function assetUrl(assetPath) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${String(assetPath || "").replace(/^\//, "")}`;
}

function phetSimPageUrl(simId) {
  return `https://phet.colorado.edu/en/simulation/${encodeURIComponent(simId)}`;
}

/**
 * @typedef {Object} QuizQuestion
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 * @property {string} explanation
 */

export const TOPIC_CONTENT = {
  acids_bases: {
    whatYoullLearn: [
      "Interpret pH as a measure of acidity/basicity (log scale).",
      "Relate [H⁺] and [OH⁻] through the water equilibrium.",
      "Predict how adding acid/base affects pH and concentration.",
    ],
    formulas: [
      "pH = −log₁₀[H⁺]",
      "pOH = −log₁₀[OH⁻]",
      "pH + pOH = 14 (at 25°C)",
    ],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: pH and pOH",
        url: "https://www.khanacademy.org/science/chemistry/acid-base-equilibrium/ph-and-poh/a/ph-poh-and-the-ph-scale",
      },
      { label: "Wikipedia: pH", url: "https://en.wikipedia.org/wiki/PH" },
    ],
    examples: [
      {
        title: "Stomach antacids",
        overlayText:
          "Antacids neutralize excess stomach acid, raising pH and reducing irritation.",
        imageKeywords: ["antacid", "medicine", "tablets"],
      },
      {
        title: "Pool and aquarium chemistry",
        overlayText:
          "Keeping pH in a safe range protects skin/eyes and helps disinfectants work effectively.",
        imageKeywords: ["swimming pool", "water testing", "ph test"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "What does a lower pH indicate?",
        options: [
          "More acidic (higher [H⁺])",
          "More basic (higher [OH⁻])",
          "Neutral solution always",
          "No change in acidity",
        ],
        correctIndex: 0,
        explanation:
          "Because pH is −log₁₀[H⁺], lower pH means higher hydrogen ion concentration.",
      },
      {
        question: "If pH decreases by 1 unit, [H⁺] changes by a factor of…",
        options: ["10× increase", "10× decrease", "2× increase", "2× decrease"],
        correctIndex: 0,
        explanation:
          "A 1-unit change on a base-10 log scale corresponds to a 10× change in [H⁺].",
      },
      {
        question: "At 25°C, if pH = 3, what is pOH?",
        options: ["11", "7", "3", "14"],
        correctIndex: 0,
        explanation: "pH + pOH = 14, so pOH = 14 − 3 = 11.",
      },
      {
        question: "Which statement is true for pure water at 25°C?",
        options: [
          "[H⁺] = [OH⁻]",
          "[H⁺] ≫ [OH⁻]",
          "[OH⁻] ≫ [H⁺]",
          "pH is always 0",
        ],
        correctIndex: 0,
        explanation: "Pure water is neutral: [H⁺] equals [OH⁻].",
      },
      {
        question: "Adding a base generally…",
        options: [
          "Increases pH",
          "Decreases pH",
          "Keeps pH fixed",
          "Removes all ions",
        ],
        correctIndex: 0,
        explanation: "Bases reduce [H⁺] (or increase [OH⁻]), which raises pH.",
      },
    ]),
  },

  area: {
    whatYoullLearn: [
      "Connect area to counting square units and building shapes.",
      "Compare area vs perimeter and explain their difference.",
      "Compute area for rectangles and composite shapes.",
    ],
    formulas: [
      "Rectangle area: A = l × w",
      "Perimeter (rectangle): P = 2(l + w)",
    ],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Area and perimeter",
        url: "https://www.khanacademy.org/math/geometry/hs-geo-foundations/hs-geo-area/a/area-perimeter",
      },
      { label: "Wikipedia: Area", url: "https://en.wikipedia.org/wiki/Area" },
    ],
    examples: [
      {
        title: "Flooring a room",
        overlayText:
          "Area helps estimate how much tile or carpet you need to cover a floor.",
        imageKeywords: ["floor tiles", "carpet", "home renovation"],
      },
      {
        title: "Painting a wall",
        overlayText:
          "Surface area determines how much paint is needed for a wall or fence.",
        imageKeywords: ["painting wall", "roller", "home improvement"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Area is measured in…",
        options: [
          "Square units (e.g., cm²)",
          "Units (e.g., cm)",
          "Cubic units (e.g., cm³)",
          "Degrees",
        ],
        correctIndex: 0,
        explanation: "Area covers a surface, so it uses square units.",
      },
      {
        question: "A rectangle is 6 units by 4 units. What is its area?",
        options: ["10", "20", "24", "48"],
        correctIndex: 2,
        explanation: "A = l × w = 6 × 4 = 24.",
      },
      {
        question: "Perimeter measures…",
        options: [
          "The distance around a shape",
          "How much space is inside",
          "The volume of a shape",
          "The number of corners",
        ],
        correctIndex: 0,
        explanation: "Perimeter is the total length of a shape’s boundary.",
      },
      {
        question: "Two different shapes can have…",
        options: [
          "Same area but different perimeter",
          "Same perimeter and always same area",
          "Different area and always same perimeter",
          "Neither same area nor perimeter",
        ],
        correctIndex: 0,
        explanation:
          "It’s common for shapes to share area while having different boundary lengths.",
      },
      {
        question:
          "If you double both length and width of a rectangle, the area…",
        options: ["Doubles", "Triples", "Quadruples", "Stays the same"],
        correctIndex: 2,
        explanation: "Area scales by the product: (2l)(2w)=4lw.",
      },
    ]),
  },

  algebra_area_model: {
    whatYoullLearn: [
      "Use area as a model for multiplication and factoring.",
      "Connect distributive property to rectangle partitioning.",
      "Expand and factor simple polynomials visually.",
    ],
    formulas: ["a(b + c) = ab + ac", "(x + a)(x + b) = x² + (a + b)x + ab"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Distributive property",
        url: "https://www.khanacademy.org/math/arithmetic/arith-review-add-subtract/arith-review-distributive-property/a/distributive-property-review",
      },
      {
        label: "Wikipedia: Distributive property",
        url: "https://en.wikipedia.org/wiki/Distributive_property",
      },
    ],
    examples: [
      {
        title: "Box method for multiplication",
        overlayText:
          "Area models help multiply large numbers by splitting into parts and adding partial products.",
        imageKeywords: ["math homework", "notebook", "multiplication"],
      },
      {
        title: "Designing layouts and budgets",
        overlayText:
          "Breaking a big problem into smaller rectangles mirrors breaking a cost or layout into parts.",
        imageKeywords: ["architect blueprint", "planning", "grid"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question:
          "Which property is shown by splitting a rectangle into two smaller rectangles?",
        options: [
          "Distributive property",
          "Commutative property (addition)",
          "Associative property (multiplication)",
          "Identity property",
        ],
        correctIndex: 0,
        explanation: "Area partitioning illustrates a(b+c)=ab+ac.",
      },
      {
        question: "Expand: a(x + b) =",
        options: ["ax + ab", "a + x + b", "x + ab", "ax + b"],
        correctIndex: 0,
        explanation: "Multiply a by each term inside the parentheses.",
      },
      {
        question:
          "The area of a rectangle with sides (x + 2) and (x + 3) expands to…",
        options: ["x² + 5x + 6", "x² + x + 5", "x² + 6x + 5", "x² + 6"],
        correctIndex: 0,
        explanation: "(x+2)(x+3)=x²+3x+2x+6=x²+5x+6.",
      },
      {
        question: "Factoring reverses which process?",
        options: [
          "Expanding (distributing)",
          "Subtracting",
          "Dividing by zero",
          "Rounding",
        ],
        correctIndex: 0,
        explanation:
          "Factoring finds a product form that expands to the expression.",
      },
      {
        question: "In an area model, the product term comes from…",
        options: [
          "Multiplying the side lengths",
          "Adding the side lengths",
          "Subtracting the areas",
          "Counting corners",
        ],
        correctIndex: 0,
        explanation: "Area is found by multiplying side lengths.",
      },
    ]),
  },

  electric_circuits: {
    whatYoullLearn: [
      "Relate voltage, current, and resistance in simple circuits.",
      "Predict how series vs parallel connections change current and equivalent resistance.",
      "Explain energy transfer: batteries supply electrical energy to loads.",
    ],
    formulas: [
      "Ohm’s law: V = IR",
      "Power: P = VI",
      "Series resistors: R_eq = R₁ + R₂",
      "Parallel resistors: 1/R_eq = 1/R₁ + 1/R₂",
    ],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Circuits",
        url: "https://www.khanacademy.org/science/physics/circuits-topic",
      },
      {
        label: "Wikipedia: Ohm's law",
        url: "https://en.wikipedia.org/wiki/Ohm%27s_law",
      },
    ],
    examples: [
      {
        title: "House wiring",
        overlayText:
          "Homes use parallel circuits so devices can run independently at the same voltage.",
        imageKeywords: ["electrical panel", "house wiring", "breaker"],
      },
      {
        title: "Phone chargers",
        overlayText:
          "Chargers regulate voltage and current to safely deliver power to batteries.",
        imageKeywords: ["phone charger", "usb cable", "charging"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question:
          "Ohm’s law relates voltage (V), current (I), and resistance (R) as…",
        options: ["V = IR", "I = VR", "R = VI", "V = I/R²"],
        correctIndex: 0,
        explanation: "Ohm’s law is V = I·R.",
      },
      {
        question: "In a series circuit, the current through each component is…",
        options: [
          "The same",
          "Always zero",
          "Different for each component",
          "Infinite",
        ],
        correctIndex: 0,
        explanation:
          "Series means one path, so the same current flows through all components.",
      },
      {
        question:
          "Adding another resistor in series usually makes the total current…",
        options: ["Decrease", "Increase", "Stay the same", "Reverse direction"],
        correctIndex: 0,
        explanation:
          "More series resistance increases R_eq, so I = V/R_eq decreases.",
      },
      {
        question: "Electrical power delivered to a device can be computed as…",
        options: ["P = VI", "P = V/I", "P = R/I", "P = V + I"],
        correctIndex: 0,
        explanation: "Power is the rate of energy transfer: P = V·I.",
      },
      {
        question:
          "Two identical resistors in parallel have an equivalent resistance that is…",
        options: [
          "Less than either resistor",
          "Greater than either resistor",
          "Equal to either resistor",
          "Always zero",
        ],
        correctIndex: 0,
        explanation:
          "Parallel provides more paths, reducing equivalent resistance.",
      },
    ]),
  },

  forces_motion: {
    whatYoullLearn: [
      "Explain how net force affects acceleration.",
      "Distinguish mass from weight and understand inertia.",
      "Use free-body diagrams to reason about motion.",
    ],
    formulas: ["Newton’s 2nd law: F_net = ma", "Weight: W = mg"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Newton’s laws",
        url: "https://www.khanacademy.org/science/physics/forces-newtons-laws",
      },
      {
        label: "Wikipedia: Newton’s laws of motion",
        url: "https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion",
      },
    ],
    examples: [
      {
        title: "Seatbelts and inertia",
        overlayText:
          "Seatbelts provide the force needed to change your motion during sudden stops.",
        imageKeywords: ["seatbelt", "car interior", "safety"],
      },
      {
        title: "Pushing a shopping cart",
        overlayText:
          "More net force produces more acceleration; heavier carts accelerate less for the same push.",
        imageKeywords: ["shopping cart", "grocery store", "push"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question:
          "If the net force on an object increases while mass stays the same, acceleration…",
        options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
        correctIndex: 0,
        explanation:
          "From F_net = ma, with constant m, a is proportional to F_net.",
      },
      {
        question: "Which quantity resists changes in motion?",
        options: [
          "Inertia (related to mass)",
          "Velocity",
          "Temperature",
          "Color",
        ],
        correctIndex: 0,
        explanation: "Mass is a measure of inertia.",
      },
      {
        question: "If net force is zero, an object…",
        options: [
          "Keeps constant velocity (could be at rest)",
          "Must be speeding up",
          "Must be slowing down",
          "Must move in a circle",
        ],
        correctIndex: 0,
        explanation: "Newton’s 1st law: zero net force means no acceleration.",
      },
      {
        question: "Weight depends on…",
        options: [
          "Mass and gravitational field (g)",
          "Only mass",
          "Only speed",
          "Only volume",
        ],
        correctIndex: 0,
        explanation: "Weight is W = mg.",
      },
      {
        question: "A free-body diagram shows…",
        options: [
          "All forces acting on an object",
          "All velocities",
          "All energies only",
          "Only friction",
        ],
        correctIndex: 0,
        explanation: "It’s a force inventory used to find net force.",
      },
    ]),
  },

  friction: {
    whatYoullLearn: [
      "Explain static vs kinetic friction and how they differ.",
      "Relate friction force to normal force and coefficient of friction.",
      "Predict motion when friction increases or decreases.",
    ],
    formulas: ["F_f ≤ μ_s N (static)", "F_k = μ_k N (kinetic)"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Friction",
        url: "https://www.khanacademy.org/science/physics/forces-newtons-laws/friction/a/frictional-forces",
      },
      {
        label: "Wikipedia: Friction",
        url: "https://en.wikipedia.org/wiki/Friction",
      },
    ],
    examples: [
      {
        title: "Car braking on a wet road",
        overlayText:
          "Friction between tires and road is why cars can brake and turn without skidding—low friction increases stopping distance.",
        imageKeywords: ["car", "wet road", "braking"],
      },
      {
        title: "Shoes gripping the ground",
        overlayText:
          "Shoe friction prevents slipping while walking or running, especially on smooth surfaces.",
        imageKeywords: ["running shoes", "sidewalk", "grip"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Static friction is the friction that…",
        options: [
          "Prevents surfaces from starting to slide",
          "Acts only after sliding starts",
          "Is always zero",
          "Acts only in fluids",
        ],
        correctIndex: 0,
        explanation:
          "Static friction adjusts up to a maximum to prevent motion.",
      },
      {
        question: "Kinetic friction acts when surfaces are…",
        options: [
          "Sliding past each other",
          "Not touching",
          "Stuck together",
          "Floating",
        ],
        correctIndex: 0,
        explanation: "Kinetic friction applies during sliding motion.",
      },
      {
        question: "Friction force generally increases when the normal force…",
        options: [
          "Increases",
          "Decreases",
          "Changes direction",
          "Becomes negative",
        ],
        correctIndex: 0,
        explanation: "Models use F = μN, so larger N means larger friction.",
      },
      {
        question: "Which change usually reduces friction?",
        options: [
          "Adding lubrication",
          "Pressing harder",
          "Increasing roughness",
          "Increasing normal force",
        ],
        correctIndex: 0,
        explanation:
          "Lubrication lowers the effective coefficient of friction.",
      },
      {
        question: "On ice, friction is lower, so stopping distance tends to…",
        options: ["Increase", "Decrease", "Stay the same", "Become zero"],
        correctIndex: 0,
        explanation:
          "Lower friction means smaller braking force, so longer distance is needed to stop.",
      },
    ]),
  },

  waves_sound: {
    whatYoullLearn: [
      "Relate wavelength, frequency, and wave speed.",
      "Connect sound pitch to frequency and loudness to amplitude.",
      "Predict how changing medium affects wave speed.",
    ],
    formulas: ["v = fλ"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Waves",
        url: "https://www.khanacademy.org/science/physics/waves-and-sound",
      },
      { label: "Wikipedia: Wave", url: "https://en.wikipedia.org/wiki/Wave" },
    ],
    examples: [
      {
        title: "Musical instruments",
        overlayText:
          "Instrument pitch changes with frequency; louder sound corresponds to larger amplitude.",
        imageKeywords: ["guitar", "music", "sound"],
      },
      {
        title: "Medical ultrasound",
        overlayText:
          "Ultrasound uses high-frequency waves to create images inside the body.",
        imageKeywords: ["ultrasound", "medical", "scan"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Wave speed is related to frequency and wavelength by…",
        options: ["v = fλ", "v = f/λ", "v = λ/f²", "v = f + λ"],
        correctIndex: 0,
        explanation: "The standard relationship is v = f·λ.",
      },
      {
        question: "For sound, higher pitch corresponds to…",
        options: [
          "Higher frequency",
          "Lower frequency",
          "Higher amplitude",
          "Lower speed",
        ],
        correctIndex: 0,
        explanation: "Pitch is determined by frequency.",
      },
      {
        question: "Loudness is most closely related to…",
        options: ["Amplitude", "Wavelength", "Period only", "Color"],
        correctIndex: 0,
        explanation: "Greater amplitude means more intense sound.",
      },
      {
        question:
          "If frequency increases while wave speed is constant, wavelength…",
        options: [
          "Decreases",
          "Increases",
          "Stays the same",
          "Becomes infinite",
        ],
        correctIndex: 0,
        explanation: "From v = fλ, λ = v/f, so increasing f reduces λ.",
      },
      {
        question: "Changing the medium can change…",
        options: [
          "Wave speed",
          "The fact that waves exist",
          "The definition of frequency",
          "Nothing",
        ],
        correctIndex: 0,
        explanation:
          "Wave speed depends on medium properties (e.g., tension, density, elasticity).",
      },
    ]),
  },

  density_buoyancy: {
    whatYoullLearn: [
      "Relate density to mass and volume.",
      "Predict floating/sinking using relative density.",
      "Explain buoyant force as displaced fluid weight.",
    ],
    formulas: ["ρ = m/V", "Buoyant force: F_b = ρ_fluid g V_displaced"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Density and buoyancy",
        url: "https://www.khanacademy.org/science/physics/fluids",
      },
      {
        label: "Wikipedia: Buoyancy",
        url: "https://en.wikipedia.org/wiki/Buoyancy",
      },
    ],
    examples: [
      {
        title: "Ships floating",
        overlayText:
          "Ships float because average density (including air inside) is less than water; buoyancy balances weight.",
        imageKeywords: ["cargo ship", "ocean", "port"],
      },
      {
        title: "Hot-air balloons",
        overlayText:
          "Lower-density hot air creates an upward buoyant force, allowing balloons to rise.",
        imageKeywords: ["hot air balloon", "sky", "festival"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Density is defined as…",
        options: [
          "mass divided by volume",
          "volume divided by mass",
          "mass times volume",
          "force times distance",
        ],
        correctIndex: 0,
        explanation: "ρ = m/V.",
      },
      {
        question: "An object floats in water if its average density is…",
        options: [
          "Less than water",
          "Greater than water",
          "Equal to zero",
          "Unrelated to water",
        ],
        correctIndex: 0,
        explanation:
          "Lower average density means buoyant force can balance weight before full submersion.",
      },
      {
        question: "Buoyant force is approximately equal to…",
        options: [
          "Weight of displaced fluid",
          "Weight of the object",
          "Mass of the object",
          "Surface area of object",
        ],
        correctIndex: 0,
        explanation:
          "Archimedes’ principle: buoyant force equals displaced fluid weight.",
      },
      {
        question:
          "If you increase volume while keeping mass constant, density…",
        options: [
          "Decreases",
          "Increases",
          "Stays the same",
          "Becomes negative",
        ],
        correctIndex: 0,
        explanation: "ρ = m/V: increasing V lowers ρ.",
      },
      {
        question: "A denser fluid (like salt water) provides…",
        options: [
          "More buoyant force for the same displaced volume",
          "Less buoyant force",
          "No buoyant force",
          "Only friction",
        ],
        correctIndex: 0,
        explanation:
          "F_b = ρ_fluid g V_displaced: higher ρ_fluid means higher F_b.",
      },
    ]),
  },

  energy: {
    whatYoullLearn: [
      "Distinguish kinetic, potential, and thermal energy.",
      "Use conservation of energy to explain energy transformations.",
      "Connect work done to changes in energy.",
    ],
    formulas: [
      "Kinetic energy: K = ½mv²",
      "Gravitational potential: U = mgh",
      "Work-energy: W = ΔK",
    ],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Work and energy",
        url: "https://www.khanacademy.org/science/physics/work-and-energy",
      },
      {
        label: "Wikipedia: Energy",
        url: "https://en.wikipedia.org/wiki/Energy",
      },
    ],
    examples: [
      {
        title: "Roller coasters",
        overlayText:
          "Potential energy at the top converts to kinetic energy as the coaster speeds up downhill.",
        imageKeywords: ["roller coaster", "amusement park", "track"],
      },
      {
        title: "Hydroelectric power",
        overlayText:
          "Water’s gravitational potential energy converts to electrical energy through turbines.",
        imageKeywords: ["hydroelectric dam", "turbine", "river"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Kinetic energy depends on…",
        options: [
          "Mass and speed",
          "Mass only",
          "Height only",
          "Temperature only",
        ],
        correctIndex: 0,
        explanation: "K = ½mv² depends on mass and the square of speed.",
      },
      {
        question: "Gravitational potential energy increases when…",
        options: [
          "Height increases",
          "Speed increases",
          "Temperature increases",
          "Time increases",
        ],
        correctIndex: 0,
        explanation: "U = mgh increases with height h.",
      },
      {
        question: "Ignoring friction, total mechanical energy is…",
        options: [
          "Conserved",
          "Always increasing",
          "Always decreasing",
          "Always zero",
        ],
        correctIndex: 0,
        explanation:
          "With no non-conservative forces, energy transforms but total stays constant.",
      },
      {
        question: "Work done by a net force is related to…",
        options: [
          "Change in kinetic energy",
          "Change in color",
          "Mass only",
          "Temperature only",
        ],
        correctIndex: 0,
        explanation: "Work-energy theorem: W = ΔK.",
      },
      {
        question: "Friction tends to convert mechanical energy into…",
        options: ["Thermal energy", "Potential energy", "Mass", "Charge"],
        correctIndex: 0,
        explanation: "Friction dissipates energy as heat.",
      },
    ]),
  },

  electric_fields_static: {
    whatYoullLearn: [
      "Explain electric charge and how charges attract/repel.",
      "Relate force between charges to distance and charge amount.",
      "Describe electric fields as a way to model forces at a distance.",
    ],
    formulas: [
      "Coulomb’s law: F = k|q₁q₂|/r²",
      "Electric field: E = F/q",
      "Electric potential (point charge): V = kq/r",
    ],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Electric charge and fields",
        url: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage",
      },
      {
        label: "Wikipedia: Coulomb's law",
        url: "https://en.wikipedia.org/wiki/Coulomb%27s_law",
      },
    ],
    examples: [
      {
        title: "Static cling (clothes, balloons)",
        overlayText:
          "Static electricity makes light objects stick after charges build up (like balloons on hair).",
        imageKeywords: ["balloon", "static electricity", "hair"],
      },
      {
        title: "Lightning",
        overlayText:
          "Charge separation in storm clouds can create huge electric fields that discharge as lightning.",
        imageKeywords: ["lightning", "storm", "clouds"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Two like charges placed near each other will…",
        options: ["Repel", "Attract", "Neutralize instantly", "Always orbit"],
        correctIndex: 0,
        explanation: "Like charges repel; opposite charges attract.",
      },
      {
        question:
          "According to Coulomb’s law, if the distance doubles, the force becomes…",
        options: [
          "One-fourth as large",
          "Half as large",
          "Twice as large",
          "Four times as large",
        ],
        correctIndex: 0,
        explanation: "F ∝ 1/r², so doubling r reduces F by 4.",
      },
      {
        question: "An electric field describes…",
        options: [
          "Force per unit charge",
          "Energy per unit mass",
          "Temperature per unit length",
          "Mass per unit volume",
        ],
        correctIndex: 0,
        explanation: "E = F/q.",
      },
      {
        question: "A positively charged test charge moves in the direction of…",
        options: [
          "The electric field",
          "Opposite the electric field",
          "No direction",
          "Only upward",
        ],
        correctIndex: 0,
        explanation:
          "By definition, E points in the direction a positive test charge would accelerate.",
      },
      {
        question:
          "Which material is most likely to allow charges to move freely?",
        options: ["Metal conductor", "Rubber insulator", "Glass", "Dry air"],
        correctIndex: 0,
        explanation:
          "Conductors allow charges (electrons) to move more easily than insulators.",
      },
    ]),
  },

  electromagnetism: {
    whatYoullLearn: [
      "Explain how changing magnetic flux induces voltage (Faraday’s law).",
      "Relate magnets, coils, and motion to electrical generation.",
      "Describe electromagnets and how current creates magnetic fields.",
    ],
    formulas: ["Faraday’s law: ε = −dΦ/dt", "Magnetic flux: Φ = BA cos(θ)"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Magnetic flux and Faraday's law",
        url: "https://www.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields/magnetic-flux-faradays-law/a/magnetic-flux-and-faradays-law",
      },
      {
        label: "Wikipedia: Faraday's law of induction",
        url: "https://en.wikipedia.org/wiki/Faraday%27s_law_of_induction",
      },
    ],
    examples: [
      {
        title: "Power generators",
        overlayText:
          "Generators convert mechanical motion into electrical energy by changing magnetic flux through coils.",
        imageKeywords: ["electric generator", "turbine", "power plant"],
      },
      {
        title: "Induction cooktops",
        overlayText:
          "Induction uses changing magnetic fields to create currents that heat cookware efficiently.",
        imageKeywords: ["induction stove", "cooking", "kitchen"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "A changing magnetic flux through a loop induces…",
        options: ["A voltage (emf)", "Mass", "Gravity", "Color"],
        correctIndex: 0,
        explanation: "Faraday’s law: ε depends on how fast flux changes.",
      },
      {
        question: "Magnetic flux increases when…",
        options: [
          "Area increases (with B aligned)",
          "Resistance increases",
          "Temperature decreases",
          "Time stops",
        ],
        correctIndex: 0,
        explanation:
          "Φ = BA cos(θ): larger A (or larger B) increases flux when aligned.",
      },
      {
        question: "Which action is most likely to induce current in a coil?",
        options: [
          "Moving a magnet toward/away from it",
          "Holding a magnet perfectly still",
          "Painting the coil",
          "Cooling the coil without changes",
        ],
        correctIndex: 0,
        explanation: "Induction requires changing flux, commonly by motion.",
      },
      {
        question: "An electromagnet is created by…",
        options: [
          "Electric current in a coil",
          "Static charge on rubber",
          "A hot object",
          "A vacuum",
        ],
        correctIndex: 0,
        explanation: "Current through a coil produces a magnetic field.",
      },
      {
        question: "Lenz’s law says the induced effect tends to…",
        options: [
          "Oppose the change causing it",
          "Amplify the change always",
          "Do nothing",
          "Only change temperature",
        ],
        correctIndex: 0,
        explanation:
          "The induced current creates fields that oppose the original change in flux.",
      },
    ]),
  },

  light_optics: {
    whatYoullLearn: [
      "Explain reflection and refraction of light at boundaries.",
      "Use lenses and mirrors to form images and predict focus.",
      "Connect color perception to wavelength and light sources.",
    ],
    formulas: [
      "Snell’s law: n₁ sinθ₁ = n₂ sinθ₂",
      "Thin lens: 1/f = 1/dₒ + 1/dᵢ",
    ],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Geometric optics",
        url: "https://www.khanacademy.org/science/physics/geometric-optics",
      },
      {
        label: "Wikipedia: Snell's law",
        url: "https://en.wikipedia.org/wiki/Snell%27s_law",
      },
    ],
    examples: [
      {
        title: "Eyeglasses and contact lenses",
        overlayText:
          "Lenses bend (refract) light to focus images sharply on the retina.",
        imageKeywords: ["eyeglasses", "optometry", "vision"],
      },
      {
        title: "Camera lenses",
        overlayText:
          "Cameras use lenses to form focused images on a sensor, similar to how eyes focus on the retina.",
        imageKeywords: ["camera lens", "photography", "focus"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Refraction happens when light…",
        options: [
          "Changes speed entering a new medium",
          "Stops completely",
          "Turns into sound",
          "Always reflects only",
        ],
        correctIndex: 0,
        explanation: "Light bends because its speed changes between media.",
      },
      {
        question: "Snell’s law relates…",
        options: [
          "Angles and refractive indices",
          "Mass and acceleration",
          "Voltage and current",
          "Force and distance",
        ],
        correctIndex: 0,
        explanation: "n₁ sinθ₁ = n₂ sinθ₂.",
      },
      {
        question: "A converging (convex) lens primarily…",
        options: [
          "Brings parallel rays to a focus",
          "Spreads rays apart only",
          "Creates charge",
          "Creates gravity",
        ],
        correctIndex: 0,
        explanation:
          "Convex lenses converge light and have a positive focal length.",
      },
      {
        question: "A larger refractive index generally means light travels…",
        options: [
          "Slower in that medium",
          "Faster in that medium",
          "At the speed of sound",
          "Instantly",
        ],
        correctIndex: 0,
        explanation: "n = c/v, so higher n corresponds to lower v.",
      },
      {
        question:
          "A prism separates white light because different wavelengths…",
        options: [
          "Refract by different amounts",
          "Have the same speed always",
          "Stop at the prism",
          "Only reflect",
        ],
        correctIndex: 0,
        explanation: "Dispersion occurs because n varies with wavelength.",
      },
    ]),
  },

  chemistry_reactions: {
    whatYoullLearn: [
      "Balance chemical equations by conserving atoms.",
      "Interpret coefficients as relative amounts of reactants/products.",
      "Connect balanced equations to real-world reactions.",
    ],
    formulas: ["Law of conservation of mass (atoms conserved)"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Balancing chemical equations",
        url: "https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiome/chemical-equations/a/balancing-chemical-equations",
      },
      {
        label: "Wikipedia: Chemical equation",
        url: "https://en.wikipedia.org/wiki/Chemical_equation",
      },
    ],
    examples: [
      {
        title: "Combustion (fuel burning)",
        overlayText:
          "Balanced equations help predict how much oxygen is needed and how much CO₂ and H₂O are produced.",
        imageKeywords: ["flame", "combustion", "burning"],
      },
      {
        title: "Rusting of iron",
        overlayText:
          "Rust forms when iron reacts with oxygen and water; equations describe the transformation of matter.",
        imageKeywords: ["rust", "metal", "corrosion"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "A balanced chemical equation must have…",
        options: [
          "The same number of each type of atom on both sides",
          "More atoms on the products side",
          "More atoms on the reactants side",
          "No coefficients",
        ],
        correctIndex: 0,
        explanation:
          "Atoms are conserved, so counts must match for each element.",
      },
      {
        question: "Coefficients in an equation represent…",
        options: [
          "Relative numbers of molecules/moles",
          "Only temperatures",
          "Only densities",
          "Only colors",
        ],
        correctIndex: 0,
        explanation: "Coefficients scale amounts of substances.",
      },
      {
        question: "When you balance an equation, you should change…",
        options: [
          "Coefficients",
          "Subscripts in formulas",
          "Element symbols",
          "The reaction itself",
        ],
        correctIndex: 0,
        explanation:
          "Changing subscripts changes the substance; balancing uses coefficients.",
      },
      {
        question: "Why do equations need to be balanced?",
        options: [
          "To satisfy conservation of mass",
          "To increase temperature",
          "To reduce volume",
          "To make reactions faster",
        ],
        correctIndex: 0,
        explanation: "Mass/atoms are conserved in chemical reactions.",
      },
      {
        question: "If H₂ appears on one side, the other side must contain…",
        options: [
          "The same total number of H atoms",
          "Only oxygen",
          "Only carbon",
          "No atoms",
        ],
        correctIndex: 0,
        explanation: "Element-by-element atom counts must match.",
      },
    ]),
  },

  solutions_concentration: {
    whatYoullLearn: [
      "Define concentration and relate it to amount and volume.",
      "Use molarity to compare solutions quantitatively.",
      "Connect absorption to concentration (Beer–Lambert law) when applicable.",
    ],
    formulas: ["M = n/V (molarity)", "Beer–Lambert: A = εℓc"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Molarity",
        url: "https://www.khanacademy.org/science/chemistry/chem-chemical-reactions-stoichiome/molarity-tutorial/a/molarity",
      },
      {
        label: "Wikipedia: Beer–Lambert law",
        url: "https://en.wikipedia.org/wiki/Beer%E2%80%93Lambert_law",
      },
    ],
    examples: [
      {
        title: "Medical blood tests",
        overlayText:
          "Labs estimate concentrations of substances by measuring light absorption and comparing to standards.",
        imageKeywords: ["medical lab", "blood test", "spectrophotometer"],
      },
      {
        title: "Water treatment",
        overlayText:
          "Concentration calculations help set safe disinfectant and contaminant levels in drinking water.",
        imageKeywords: ["water treatment", "clean water", "laboratory"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Molarity is defined as…",
        options: [
          "Moles of solute per liter of solution",
          "Liters per mole",
          "Grams per second",
          "Moles per second",
        ],
        correctIndex: 0,
        explanation: "M = n/V.",
      },
      {
        question:
          "If you dilute a solution by adding water, concentration usually…",
        options: [
          "Decreases",
          "Increases",
          "Stays the same",
          "Becomes negative",
        ],
        correctIndex: 0,
        explanation: "The same solute is spread over a larger volume.",
      },
      {
        question: "Beer–Lambert law connects absorbance to…",
        options: [
          "Concentration (and path length)",
          "Mass only",
          "Temperature only",
          "Time only",
        ],
        correctIndex: 0,
        explanation: "A = εℓc increases with concentration for a fixed setup.",
      },
      {
        question: "Two solutions with the same molarity have…",
        options: [
          "The same moles per liter",
          "The same mass always",
          "The same color always",
          "The same density always",
        ],
        correctIndex: 0,
        explanation: "Molarity compares moles per unit volume.",
      },
      {
        question: "If volume doubles and moles stay the same, molarity…",
        options: ["Halves", "Doubles", "Stays the same", "Becomes zero"],
        correctIndex: 0,
        explanation: "M = n/V: increasing V lowers M.",
      },
    ]),
  },

  gases: {
    whatYoullLearn: [
      "Relate pressure, volume, temperature, and moles for gases.",
      "Predict how changing one variable affects the others.",
      "Connect particle motion (kinetic theory) to macroscopic gas behavior.",
    ],
    formulas: [
      "Ideal gas law: PV = nRT",
      "Boyle’s law: P₁V₁ = P₂V₂ (T constant)",
    ],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Ideal gas law",
        url: "https://www.khanacademy.org/science/chemistry/gases-and-kinetic-molecular-theory/ideal-gas-law/a/ideal-gas-law",
      },
      {
        label: "Wikipedia: Ideal gas law",
        url: "https://en.wikipedia.org/wiki/Ideal_gas_law",
      },
    ],
    examples: [
      {
        title: "Car tires and pressure",
        overlayText:
          "Tire pressure changes with temperature; proper pressure improves safety and efficiency.",
        imageKeywords: ["car tire", "air pressure", "mechanic"],
      },
      {
        title: "Scuba diving",
        overlayText:
          "Divers must consider pressure changes with depth to avoid rapid expansion of gases.",
        imageKeywords: ["scuba diver", "ocean", "pressure"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "The ideal gas law is…",
        options: ["PV = nRT", "V = IR", "F = ma", "E = mc²"],
        correctIndex: 0,
        explanation:
          "PV = nRT relates pressure, volume, moles, and temperature.",
      },
      {
        question:
          "At constant temperature, if volume decreases, pressure usually…",
        options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
        correctIndex: 0,
        explanation: "Boyle’s law: P ∝ 1/V (when T constant).",
      },
      {
        question: "Gas pressure is caused by…",
        options: [
          "Particles colliding with container walls",
          "Particles being motionless",
          "Only gravity",
          "Only magnetism",
        ],
        correctIndex: 0,
        explanation: "Pressure comes from momentum transfer during collisions.",
      },
      {
        question:
          "Increasing temperature (in kelvin) generally makes gas particles…",
        options: [
          "Move faster on average",
          "Move slower",
          "Stop moving",
          "Disappear",
        ],
        correctIndex: 0,
        explanation: "Higher temperature means higher average kinetic energy.",
      },
      {
        question:
          "If you add more gas moles to a fixed volume at constant temperature, pressure…",
        options: [
          "Increases",
          "Decreases",
          "Stays the same",
          "Must become negative",
        ],
        correctIndex: 0,
        explanation: "From PV = nRT, with V and T fixed, P ∝ n.",
      },
    ]),
  },

  fractions: {
    whatYoullLearn: [
      "Interpret fractions as parts of a whole and as numbers on a number line.",
      "Create equivalent fractions by scaling numerator and denominator.",
      "Compare and combine fractions using common denominators when needed.",
    ],
    formulas: ["Equivalent fractions: a/b = (ka)/(kb) for k ≠ 0"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Fractions",
        url: "https://www.khanacademy.org/math/arithmetic/fraction-arithmetic",
      },
      {
        label: "Wikipedia: Fraction (mathematics)",
        url: "https://en.wikipedia.org/wiki/Fraction_(mathematics)",
      },
    ],
    examples: [
      {
        title: "Cooking and recipes",
        overlayText:
          "Recipes use fractions for ingredient amounts; scaling recipes uses equivalent fractions and multiplication.",
        imageKeywords: ["cooking", "measuring cup", "ingredients"],
      },
      {
        title: "Construction measurements",
        overlayText:
          "Rulers and tape measures often use fractional inches; accuracy depends on reading fractions correctly.",
        imageKeywords: ["measuring tape", "construction", "carpentry"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Which fraction is equivalent to 1/2?",
        options: ["2/4", "1/3", "3/5", "2/3"],
        correctIndex: 0,
        explanation:
          "Multiplying numerator and denominator by the same number keeps the value the same.",
      },
      {
        question: "To compare 1/3 and 1/4, you can note that…",
        options: [
          "1/3 is larger",
          "1/4 is larger",
          "They are equal",
          "Neither can be compared",
        ],
        correctIndex: 0,
        explanation:
          "With the same numerator, the smaller denominator gives the larger fraction.",
      },
      {
        question: "A fraction represents…",
        options: ["A number", "Only a picture", "Only a word", "Only a shape"],
        correctIndex: 0,
        explanation:
          "Fractions are numbers that can be placed on a number line.",
      },
      {
        question:
          "If you multiply both numerator and denominator by 3, the fraction value…",
        options: [
          "Stays the same",
          "Triples",
          "Becomes zero",
          "Becomes negative",
        ],
        correctIndex: 0,
        explanation:
          "Scaling both parts equally produces an equivalent fraction.",
      },
      {
        question: "Which is closer to 1: 5/6 or 3/4?",
        options: ["5/6", "3/4", "They are equal", "Cannot tell"],
        correctIndex: 0,
        explanation: "5/6 ≈ 0.833; 3/4 = 0.75, so 5/6 is closer to 1.",
      },
    ]),
  },

  functions_graphing: {
    whatYoullLearn: [
      "Interpret graphs as relationships between variables.",
      "Connect slope and intercept to rate of change and starting value.",
      "Use curve fitting to model real data with simple functions.",
    ],
    formulas: ["Slope: m = Δy/Δx", "Line: y = mx + b"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Linear functions",
        url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-functions",
      },
      {
        label: "Wikipedia: Linear function",
        url: "https://en.wikipedia.org/wiki/Linear_function",
      },
    ],
    examples: [
      {
        title: "Business growth charts",
        overlayText:
          "Graphs show trends like revenue over time; slope tells how fast something is changing.",
        imageKeywords: ["business chart", "graph", "analytics"],
      },
      {
        title: "Motion tracking",
        overlayText:
          "Position–time graphs show motion; slope represents velocity (rate of change of position).",
        imageKeywords: ["running", "track", "motion analysis"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "In y = mx + b, m represents…",
        options: ["Slope", "Area", "Volume", "Temperature"],
        correctIndex: 0,
        explanation: "m is the rate of change (rise over run).",
      },
      {
        question: "A positive slope means y…",
        options: [
          "Increases as x increases",
          "Decreases as x increases",
          "Stays constant",
          "Becomes negative always",
        ],
        correctIndex: 0,
        explanation: "Positive m indicates an upward trend.",
      },
      {
        question:
          "In the linear function y = mx + b, the intercept b is the value of y when…",
        options: ["x = 0", "x = 1", "y = 0", "x is infinite"],
        correctIndex: 0,
        explanation: "b is the starting value at x=0.",
      },
      {
        question: "Slope is computed as…",
        options: ["Δy/Δx", "Δx/Δy", "Δx+Δy", "Δy−Δx always"],
        correctIndex: 0,
        explanation: "m = (y₂−y₁)/(x₂−x₁).",
      },
      {
        question: "Curve fitting is used to…",
        options: [
          "Find a function that approximates data",
          "Randomize data",
          "Hide outliers only",
          "Turn graphs into text",
        ],
        correctIndex: 0,
        explanation:
          "A model can describe trends and support prediction within limits.",
      },
    ]),
  },

  statistics: {
    whatYoullLearn: [
      "Summarize data with measures of center (mean/median).",
      "Describe spread/variability using range and related ideas.",
      "Compare distributions and interpret outliers.",
    ],
    formulas: ["Mean: x̄ = (Σx)/n"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Statistics",
        url: "https://www.khanacademy.org/math/statistics-probability",
      },
      {
        label: "Wikipedia: Mean",
        url: "https://en.wikipedia.org/wiki/Arithmetic_mean",
      },
    ],
    examples: [
      {
        title: "Class test scores",
        overlayText:
          "Mean and median help summarize performance; variability shows how spread out scores are.",
        imageKeywords: ["students", "exam", "grades"],
      },
      {
        title: "Weather data",
        overlayText:
          "Average temperature and variability help describe climate patterns and unusual days.",
        imageKeywords: ["weather", "forecast", "temperature"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "The mean is…",
        options: [
          "The average (sum divided by count)",
          "The middle value always",
          "The largest value",
          "The smallest value",
        ],
        correctIndex: 0,
        explanation: "Mean = (Σx)/n.",
      },
      {
        question: "The median is…",
        options: [
          "The middle value when sorted",
          "The sum",
          "The product",
          "Always the most common",
        ],
        correctIndex: 0,
        explanation:
          "Median is the middle of ordered data (or average of two middles).",
      },
      {
        question: "A distribution with higher variability has data that are…",
        options: [
          "More spread out",
          "More tightly clustered",
          "All identical",
          "All zero",
        ],
        correctIndex: 0,
        explanation: "Variability is about spread.",
      },
      {
        question: "An outlier is a data point that…",
        options: [
          "Is unusually far from most others",
          "Is always the median",
          "Must be removed",
          "Is always wrong",
        ],
        correctIndex: 0,
        explanation: "Outliers can be real, but they deserve attention.",
      },
      {
        question: "If you add the same constant to every data value, the mean…",
        options: [
          "Increases by that constant",
          "Stays the same",
          "Becomes zero",
          "Doubles",
        ],
        correctIndex: 0,
        explanation: "Adding c to each x adds c to the mean.",
      },
    ]),
  },

  climate_greenhouse: {
    whatYoullLearn: [
      "Explain how greenhouse gases absorb and re-emit infrared radiation.",
      "Connect energy balance to temperature changes.",
      "Explore how different gases and concentrations affect warming.",
    ],
    formulas: ["Energy balance (concept): incoming ≈ outgoing at equilibrium"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "NASA: The greenhouse effect",
        url: "https://climate.nasa.gov/faq/19/what-is-the-greenhouse-effect/",
      },
      {
        label: "Wikipedia: Greenhouse effect",
        url: "https://en.wikipedia.org/wiki/Greenhouse_effect",
      },
    ],
    examples: [
      {
        title: "Earth’s surface warming",
        overlayText:
          "Greenhouse gases help keep Earth warm by trapping some outgoing infrared radiation.",
        imageKeywords: ["earth from space", "atmosphere", "climate"],
      },
      {
        title: "Greenhouses for plants",
        overlayText:
          "Real greenhouses stay warmer by reducing heat loss and trapping warm air and radiation.",
        imageKeywords: ["greenhouse", "plants", "agriculture"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Greenhouse gases warm the planet mainly by…",
        options: [
          "Absorbing and re-emitting infrared radiation",
          "Blocking all sunlight",
          "Creating oxygen",
          "Increasing gravity",
        ],
        correctIndex: 0,
        explanation:
          "They interact strongly with infrared emitted from Earth’s surface.",
      },
      {
        question:
          "At equilibrium (no net warming), Earth’s temperature is roughly steady when…",
        options: [
          "Energy in equals energy out",
          "Energy in is always larger",
          "Energy out is always zero",
          "The Sun turns off",
        ],
        correctIndex: 0,
        explanation:
          "A stable temperature requires a balance between incoming and outgoing energy.",
      },
      {
        question: "Increasing greenhouse gas concentration generally causes…",
        options: [
          "More infrared trapping",
          "Less infrared trapping",
          "No change ever",
          "Immediate freezing",
        ],
        correctIndex: 0,
        explanation:
          "More absorbing molecules increases the chance IR is absorbed/re-emitted.",
      },
      {
        question: "Infrared radiation is most closely associated with…",
        options: ["Heat", "Ultraviolet", "X-rays", "Gamma rays"],
        correctIndex: 0,
        explanation: "IR is often called heat radiation.",
      },
      {
        question: "A greenhouse effect in the atmosphere affects…",
        options: [
          "How quickly Earth loses heat to space",
          "The number of continents",
          "The length of a day",
          "Earth’s mass",
        ],
        correctIndex: 0,
        explanation: "It changes outgoing IR, affecting heat loss.",
      },
    ]),
  },

  springs_hookes: {
    whatYoullLearn: [
      "Relate spring force to displacement (Hooke’s law).",
      "Explain elastic potential energy stored in springs.",
      "Predict how stiffness (k) changes stretching and oscillations.",
    ],
    formulas: ["Hooke’s law: F = −kx", "Spring energy: U = ½kx²"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Hooke's law",
        url: "https://www.khanacademy.org/science/physics/work-and-energy/hookes-law/a/what-is-hookes-law",
      },
      {
        label: "Wikipedia: Hooke's law",
        url: "https://en.wikipedia.org/wiki/Hooke%27s_law",
      },
    ],
    examples: [
      {
        title: "Car suspension",
        overlayText:
          "Springs and shock absorbers smooth bumps by storing and dissipating energy.",
        imageKeywords: ["car suspension", "spring", "mechanic"],
      },
      {
        title: "Spring scales",
        overlayText:
          "A spring scale measures force by how much a spring stretches.",
        imageKeywords: ["spring scale", "measurement", "force"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Hooke’s law states that spring force is proportional to…",
        options: [
          "Displacement from equilibrium",
          "Mass only",
          "Temperature only",
          "Time only",
        ],
        correctIndex: 0,
        explanation: "F = −kx.",
      },
      {
        question: "A larger k means the spring is…",
        options: ["Stiffer", "Softer", "Weightless", "Hotter"],
        correctIndex: 0,
        explanation: "Higher k means more force for the same stretch.",
      },
      {
        question: "Elastic potential energy stored in a spring is…",
        options: ["½kx²", "kx", "mg", "VI"],
        correctIndex: 0,
        explanation: "U = ½kx².",
      },
      {
        question: "If you double the stretch x, spring energy…",
        options: ["Quadruples", "Doubles", "Halves", "Stays the same"],
        correctIndex: 0,
        explanation: "Energy depends on x².",
      },
      {
        question: "The minus sign in F = −kx indicates…",
        options: [
          "Force opposes the displacement",
          "Force increases temperature",
          "Force points outward always",
          "No meaning",
        ],
        correctIndex: 0,
        explanation: "Spring force is restoring toward equilibrium.",
      },
    ]),
  },

  torque_balance: {
    whatYoullLearn: [
      "Explain torque as the turning effect of a force.",
      "Predict balance using clockwise vs counterclockwise torques.",
      "Relate lever arm distance to how easy it is to rotate an object.",
    ],
    formulas: ["Torque magnitude: τ = rF sin(θ)", "Equilibrium: Στ = 0"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Torque",
        url: "https://www.khanacademy.org/science/physics/torque-angular-momentum/torque-tutorial/a/torque",
      },
      {
        label: "Wikipedia: Torque",
        url: "https://en.wikipedia.org/wiki/Torque",
      },
    ],
    examples: [
      {
        title: "Seesaws",
        overlayText:
          "A seesaw balances when torques on both sides match; moving farther from the pivot increases torque.",
        imageKeywords: ["seesaw", "playground", "balance"],
      },
      {
        title: "Wrenches and door handles",
        overlayText:
          "Longer handles produce more torque, making it easier to loosen bolts or open heavy doors.",
        imageKeywords: ["wrench", "tool", "bolt"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Torque increases when…",
        options: [
          "You apply force farther from the pivot",
          "You apply force closer to the pivot",
          "The object is painted",
          "Time passes",
        ],
        correctIndex: 0,
        explanation: "Lever arm distance r increases τ.",
      },
      {
        question: "A balanced lever has…",
        options: [
          "Net torque equal to zero",
          "Net force always zero",
          "No forces acting",
          "Only friction",
        ],
        correctIndex: 0,
        explanation: "Rotational equilibrium means Στ = 0.",
      },
      {
        question:
          "If a child moves closer to the pivot on a seesaw, their torque…",
        options: [
          "Decreases",
          "Increases",
          "Stays the same",
          "Becomes infinite",
        ],
        correctIndex: 0,
        explanation: "Torque depends on distance from pivot.",
      },
      {
        question: "The lever arm is the…",
        options: [
          "Perpendicular distance from pivot to force line",
          "Total length of the object",
          "Mass of the lever",
          "Angle only",
        ],
        correctIndex: 0,
        explanation:
          "Lever arm is the perpendicular distance that matters for rotation.",
      },
      {
        question: "Applying force at 90° to the lever arm gives…",
        options: [
          "Maximum torque for that force and distance",
          "Zero torque",
          "Minimum torque",
          "No rotation ever",
        ],
        correctIndex: 0,
        explanation: "sin(90°)=1, so τ is maximized.",
      },
    ]),
  },

  gravity_orbits: {
    whatYoullLearn: [
      "Relate gravitational force to mass and distance.",
      "Explain orbits as continuous free-fall around a body.",
      "Predict how changing speed or distance affects orbital motion.",
    ],
    formulas: ["F = Gm₁m₂/r²", "Circular orbit speed: v = √(GM/r)"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Gravity and orbits",
        url: "https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation",
      },
      {
        label: "Wikipedia: Orbital mechanics",
        url: "https://en.wikipedia.org/wiki/Orbital_mechanics",
      },
    ],
    examples: [
      {
        title: "Satellites and GPS",
        overlayText:
          "Satellites stay in orbit when forward speed and gravity balance to provide centripetal acceleration.",
        imageKeywords: ["satellite", "earth orbit", "space"],
      },
      {
        title: "Planetary motion",
        overlayText:
          "Planets orbit stars due to gravity; orbital period depends on distance and central mass.",
        imageKeywords: ["planet", "solar system", "orbit"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Gravitational force between two masses decreases when…",
        options: [
          "Distance increases",
          "Mass increases",
          "Time increases",
          "Temperature increases",
        ],
        correctIndex: 0,
        explanation: "F ∝ 1/r².",
      },
      {
        question: "An orbit is best described as…",
        options: [
          "Continuous free-fall around a body",
          "No gravity at all",
          "Only straight-line motion",
          "Only random motion",
        ],
        correctIndex: 0,
        explanation:
          "Gravity provides centripetal acceleration while the object keeps moving forward.",
      },
      {
        question:
          "If orbital radius increases (around the same planet), orbital speed generally…",
        options: [
          "Decreases",
          "Increases",
          "Stays the same",
          "Becomes infinite",
        ],
        correctIndex: 0,
        explanation: "v = √(GM/r): larger r gives smaller v.",
      },
      {
        question:
          "Doubling the distance between two masses changes gravitational force by…",
        options: [
          "A factor of 1/4",
          "A factor of 1/2",
          "A factor of 2",
          "A factor of 4",
        ],
        correctIndex: 0,
        explanation: "Inverse-square dependence.",
      },
      {
        question: "Gravity depends on…",
        options: [
          "Both mass and distance",
          "Distance only",
          "Mass only",
          "Color",
        ],
        correctIndex: 0,
        explanation: "F = Gm₁m₂/r² depends on both.",
      },
    ]),
  },

  diffusion: {
    whatYoullLearn: [
      "Explain diffusion as random motion leading to net spread from high to low concentration.",
      "Predict how temperature and particle mass affect diffusion rate.",
      "Connect diffusion to real-world mixing and transport processes.",
    ],
    formulas: ["Diffusion rate depends on particle motion (concept)"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Diffusion and osmosis",
        url: "https://www.khanacademy.org/science/biology/membranes-and-transport/diffusion-and-osmosis/a/diffusion-and-osmosis",
      },
      {
        label: "Wikipedia: Diffusion",
        url: "https://en.wikipedia.org/wiki/Diffusion",
      },
    ],
    examples: [
      {
        title: "Perfume spreading in a room",
        overlayText:
          "Odor molecules diffuse through air from high concentration near the source to lower concentration elsewhere.",
        imageKeywords: ["perfume", "spray", "room"],
      },
      {
        title: "Oxygen exchange in lungs",
        overlayText:
          "Oxygen diffuses from alveoli into blood due to concentration gradients.",
        imageKeywords: ["lungs", "breathing", "medical"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Diffusion is driven by…",
        options: [
          "Random particle motion and concentration differences",
          "Gravity only",
          "Magnetism only",
          "Electric circuits",
        ],
        correctIndex: 0,
        explanation:
          "Random motion produces net movement from higher to lower concentration.",
      },
      {
        question: "Diffusion tends to move particles from…",
        options: [
          "High concentration to low concentration",
          "Low to high only",
          "Cold to hot only",
          "Left to right only",
        ],
        correctIndex: 0,
        explanation: "Net transport follows the concentration gradient.",
      },
      {
        question: "Increasing temperature generally makes diffusion…",
        options: ["Faster", "Slower", "Stop", "Reverse"],
        correctIndex: 0,
        explanation:
          "Higher temperature increases average kinetic energy and motion.",
      },
      {
        question: "At equilibrium in diffusion, particles…",
        options: [
          "Are evenly mixed on average",
          "Stop moving",
          "All move to one side",
          "All disappear",
        ],
        correctIndex: 0,
        explanation: "They still move randomly, but there is no net gradient.",
      },
      {
        question: "Diffusion is important for…",
        options: [
          "Mixing and transport in fluids and gases",
          "Only building bridges",
          "Only making circuits",
          "Only orbiting planets",
        ],
        correctIndex: 0,
        explanation: "Diffusion underlies many mixing/transport processes.",
      },
    ]),
  },

  quantum_radiation: {
    whatYoullLearn: [
      "Connect temperature to emitted radiation spectrum (blackbody).",
      "Explain that photons carry energy proportional to frequency.",
      "Interpret how peak wavelength shifts with temperature.",
    ],
    formulas: ["Photon energy: E = hf", "Wien’s law: λ_max ∝ 1/T"],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "Khan Academy: Blackbody radiation",
        url: "https://www.khanacademy.org/science/physics/quantum-physics/quantum-nature-of-light/a/blackbody-radiation",
      },
      {
        label: "Wikipedia: Black-body radiation",
        url: "https://en.wikipedia.org/wiki/Black-body_radiation",
      },
    ],
    examples: [
      {
        title: "Infrared cameras",
        overlayText:
          "Thermal cameras detect infrared radiation emitted by warm objects.",
        imageKeywords: ["thermal camera", "infrared", "heat"],
      },
      {
        title: "Stars and color",
        overlayText:
          "Hotter stars peak at shorter wavelengths (bluer); cooler stars peak at longer wavelengths (redder).",
        imageKeywords: ["stars", "night sky", "astronomy"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "Photon energy is proportional to…",
        options: ["Frequency", "Wavelength", "Mass", "Time only"],
        correctIndex: 0,
        explanation: "E = hf.",
      },
      {
        question:
          "As temperature increases, the peak wavelength of a blackbody…",
        options: [
          "Decreases (shifts shorter)",
          "Increases (shifts longer)",
          "Stays fixed",
          "Becomes zero always",
        ],
        correctIndex: 0,
        explanation: "Wien’s law: λ_max is inversely related to T.",
      },
      {
        question: "Infrared is associated with…",
        options: [
          "Lower frequency than visible",
          "Higher frequency than X-rays",
          "No energy",
          "Only sound waves",
        ],
        correctIndex: 0,
        explanation:
          "Infrared is lower frequency (longer wavelength) than visible light.",
      },
      {
        question: "A blackbody spectrum describes…",
        options: [
          "How intensity varies with wavelength",
          "How mass varies with time",
          "Only electric current",
          "Only chemical reactions",
        ],
        correctIndex: 0,
        explanation:
          "It’s a distribution of emitted radiation vs wavelength/frequency.",
      },
      {
        question: "Hotter objects generally emit…",
        options: [
          "More radiation and at shorter wavelengths",
          "Less radiation always",
          "Only green light",
          "No infrared",
        ],
        correctIndex: 0,
        explanation:
          "Intensity increases and peak shifts to shorter wavelengths with temperature.",
      },
    ]),
  },

  general_science: {
    whatYoullLearn: [
      "Identify the main variables you can change and measure.",
      "Make predictions, then test them by adjusting one variable at a time.",
      "Explain results using evidence from the simulation.",
    ],
    formulas: [],
    resources: [
      { label: "PhET simulation page", url: null },
      {
        label: "PhET Teacher Resources",
        url: "https://phet.colorado.edu/en/teaching-resources",
      },
    ],
    examples: [
      {
        title: "Engineering prototypes",
        overlayText:
          "Simulations help test ideas quickly before building real prototypes.",
        imageKeywords: ["engineering", "prototype", "workshop"],
      },
      {
        title: "Science experiments",
        overlayText:
          "Controlling variables is key to understanding cause and effect in experiments.",
        imageKeywords: ["science lab", "experiment", "research"],
      },
    ],
    quiz: /** @type {QuizQuestion[]} */ ([
      {
        question: "When testing a hypothesis, a good strategy is to…",
        options: [
          "Change one variable at a time",
          "Change everything at once",
          "Never measure outcomes",
          "Ignore results",
        ],
        correctIndex: 0,
        explanation:
          "Changing one variable helps you isolate cause and effect.",
      },
      {
        question: "A prediction should be…",
        options: [
          "Testable",
          "Unrelated to data",
          "Always correct",
          "Based only on guesses",
        ],
        correctIndex: 0,
        explanation: "Testable predictions can be checked with evidence.",
      },
      {
        question: "Evidence in a simulation can include…",
        options: [
          "Measurements and observed trends",
          "Only opinions",
          "Only color choices",
          "Nothing",
        ],
        correctIndex: 0,
        explanation:
          "Use what you can measure and observe to justify explanations.",
      },
      {
        question: "A good conclusion should connect…",
        options: [
          "Results back to the original question",
          "Random facts",
          "Only the title",
          "Only the thumbnail",
        ],
        correctIndex: 0,
        explanation:
          "Conclusions explain what the results mean for the question/hypothesis.",
      },
      {
        question: "If results contradict your prediction, you should…",
        options: [
          "Re-check assumptions and test again",
          "Hide the results",
          "Stop learning",
          "Assume the simulation is wrong",
        ],
        correctIndex: 0,
        explanation: "Unexpected results are a chance to refine understanding.",
      },
    ]),
  },
};

const TOPIC_MATCHERS = [
  {
    key: "chemistry_reactions",
    match: (id) =>
      id.includes("balancing-chemical-equations") ||
      id.includes("reactants") ||
      id.includes("products") ||
      id.includes("reaction"),
  },
  {
    key: "acids_bases",
    match: (id) =>
      id.includes("acid-base") ||
      id.includes("acid") ||
      id.includes("base") ||
      id.includes("ph"),
  },
  {
    key: "solutions_concentration",
    match: (id) =>
      id.includes("concentration") ||
      id.includes("molarity") ||
      id.includes("beer") ||
      id.includes("beers-law"),
  },
  { key: "gases", match: (id) => id.includes("gas") || id.includes("gases") },
  {
    key: "light_optics",
    match: (id) =>
      id.includes("light") ||
      id.includes("optics") ||
      id.includes("lens") ||
      id.includes("mirror") ||
      id.includes("refraction") ||
      id.includes("bending-light") ||
      id.includes("color"),
  },
  {
    key: "quantum_radiation",
    match: (id) =>
      id.includes("blackbody") ||
      id.includes("photoelectric") ||
      id.includes("quantum") ||
      id.includes("laser") ||
      id.includes("band-structure") ||
      id.includes("davisson") ||
      id.includes("rutherford") ||
      id.includes("radioactive") ||
      id.includes("decay") ||
      id.includes("beta") ||
      id.includes("nuclear") ||
      id.includes("fission") ||
      id.includes("nucleus"),
  },
  {
    key: "electric_fields_static",
    match: (id) =>
      id.includes("static-electricity") ||
      id.includes("balloons-and-static-electricity") ||
      id.includes("charges-and-fields") ||
      id.includes("coulombs-law") ||
      id.includes("travoltage") ||
      id.includes("charge") ||
      id.includes("electric-field") ||
      id.includes("electricity"),
  },
  {
    key: "electromagnetism",
    match: (id) =>
      id.includes("faraday") ||
      id.includes("generator") ||
      id.includes("electromagnetic") ||
      id.includes("magnet"),
  },
  {
    key: "electric_circuits",
    match: (id) =>
      id.includes("circuit") ||
      id.includes("ohm") ||
      id.includes("resistance") ||
      id.includes("capacitor") ||
      id.includes("battery") ||
      id.includes("conductivity"),
  },
  {
    key: "springs_hookes",
    match: (id) => id.includes("hookes-law") || id.includes("spring"),
  },
  {
    key: "torque_balance",
    match: (id) =>
      id.includes("balancing-act") ||
      id.includes("torque") ||
      id.includes("lever"),
  },
  {
    key: "gravity_orbits",
    match: (id) =>
      id.includes("gravity-and-orbits") ||
      id.includes("orbit") ||
      id.includes("gravitation") ||
      id.includes("kepler"),
  },
  { key: "diffusion", match: (id) => id.includes("diffusion") },
  {
    key: "statistics",
    match: (id) =>
      id.includes("center-and-variability") ||
      id.includes("variability") ||
      id.includes("statistics"),
  },
  {
    key: "fractions",
    match: (id) => id.includes("fraction") || id.includes("fractions"),
  },
  {
    key: "functions_graphing",
    match: (id) =>
      id.includes("function") ||
      id.includes("graph") ||
      id.includes("curve-fitting"),
  },
  {
    key: "climate_greenhouse",
    match: (id) =>
      id.includes("greenhouse-effect") ||
      id.includes("greenhouse") ||
      id.includes("climate") ||
      id.includes("glacier"),
  },
  { key: "friction", match: (id) => id.includes("friction") },
  {
    key: "waves_sound",
    match: (id) =>
      id.includes("wave") || id.includes("sound") || id.includes("pendulum"),
  },
  {
    key: "density_buoyancy",
    match: (id) =>
      id.includes("density") || id.includes("buoyancy") || id.includes("float"),
  },
  {
    key: "energy",
    match: (id) =>
      id.includes("energy") || id.includes("work") || id.includes("power"),
  },
  {
    key: "algebra_area_model",
    match: (id) => id.includes("area-model") || id.includes("algebra"),
  },
  {
    key: "area",
    match: (id) => id.includes("area") || id.includes("perimeter"),
  },
  {
    key: "forces_motion",
    match: (id) =>
      id.includes("force") ||
      id.includes("motion") ||
      id.includes("newton") ||
      id.includes("ramp") ||
      id.includes("projectile") ||
      id.includes("collision"),
  },
];

function inferTopicKey(simId) {
  const id = String(simId || "").toLowerCase();
  const found = TOPIC_MATCHERS.find((t) => t.match(id));
  return found ? found.key : "general_science";
}

function buildExamples(topicKey) {
  const examples =
    realLifeImages?.[topicKey] || realLifeImages?.general_science || [];

  return examples.slice(0, 2).map((ex) => ({
    title: ex.title,
    overlayText: ex.overlayText,
    imageUrl: assetUrl(ex.assetPath),
  }));
}

function normalizeLegacyExamples(examples) {
  return (Array.isArray(examples) ? examples : []).slice(0, 2).map((ex) => ({
    title: ex?.title || "",
    overlayText: ex?.overlayText || ex?.description || "",
    imageUrl: ex?.imageUrl || "",
  }));
}

function examplesLookGeneric(simulation) {
  const examples = Array.isArray(simulation?.realLifeExamples)
    ? simulation.realLifeExamples
    : [];
  if (examples.length === 0) return true;

  const simId = String(simulation?.id || "").toLowerCase();
  const genericTitle = (t) =>
    t === "real world application" ||
    t === "scientific context" ||
    t === "real-life example" ||
    t === "real life example";
  const genericText = (t) =>
    t.includes("applies to everyday technology and nature") ||
    t.includes("core principles") ||
    t.includes("in research") ||
    t.includes("see how ") ||
    (simId && t.includes(simId));

  // If most examples look like placeholders, treat the set as generic.
  let genericCount = 0;
  for (const ex of examples.slice(0, 2)) {
    const title = String(ex?.title || "")
      .trim()
      .toLowerCase();
    const text = String(ex?.overlayText || ex?.description || "")
      .trim()
      .toLowerCase();
    if (!title || genericTitle(title) || genericText(text)) genericCount++;
  }
  return genericCount >= Math.min(2, examples.length);
}

function buildResources(sim, topicKey) {
  const topic = TOPIC_CONTENT[topicKey] || TOPIC_CONTENT.general_science;
  return (topic.resources || []).map((r) => ({
    label: r.label,
    url: r.url || phetSimPageUrl(sim.id),
  }));
}

function buildQuiz(sim, topicKey) {
  const topic = TOPIC_CONTENT[topicKey] || TOPIC_CONTENT.general_science;
  // Always provide a quiz, even if simulations.json has old generic questions.
  return topic.quiz;
}

function buildWhatYoullLearn(sim, topicKey) {
  const topic = TOPIC_CONTENT[topicKey] || TOPIC_CONTENT.general_science;
  return topic.whatYoullLearn;
}

function buildFormulas(sim, topicKey) {
  const topic = TOPIC_CONTENT[topicKey] || TOPIC_CONTENT.general_science;
  return topic.formulas;
}

export function enrichSimulation(simulation) {
  const topicKey = inferTopicKey(simulation?.id);
  // Some legacy entries in simulations.json include generic, cross-topic quizzes.
  // For a small known set, prefer our curated topic quiz to keep the UI relevant.
  const FORCE_TOPIC_QUIZ_SIM_IDS = new Set([
    "bending-light",
    "balancing-chemical-equations",
    "greenhouse-effect",
    "charges-and-fields",
    "hookes-law",
    "gravity-and-orbits",
    "gases-intro",
    "diffusion",
    "curve-fitting",
    "balancing-act",
  ]);
  const shouldForceTopicQuiz = FORCE_TOPIC_QUIZ_SIM_IDS.has(simulation?.id);

  return {
    ...simulation,
    topicKey,
    gameType: "quiz",
    whatYoullLearn:
      simulation.whatYoullLearn && simulation.whatYoullLearn.length
        ? simulation.whatYoullLearn
        : buildWhatYoullLearn(simulation, topicKey),
    formulas:
      simulation.formulas && simulation.formulas.length
        ? simulation.formulas
        : buildFormulas(simulation, topicKey),
    learningResources:
      simulation.learningResources && simulation.learningResources.length
        ? simulation.learningResources
        : buildResources(simulation, topicKey),
    // Use curated examples when the JSON contains placeholders; otherwise keep
    // simulation-specific examples (e.g., elementary math coins/recipes).
    realLifeExamples: examplesLookGeneric(simulation)
      ? buildExamples(topicKey)
      : normalizeLegacyExamples(simulation.realLifeExamples),
    gameQuestions: shouldForceTopicQuiz
      ? buildQuiz(simulation, topicKey)
      : simulation.gameQuestions && simulation.gameQuestions.length
      ? simulation.gameQuestions
      : buildQuiz(simulation, topicKey),
  };
}
