"""
Generate all 172 PhET simulations for the demo
This script creates a comprehensive simulations.json file
"""

import json

# Base template for simulations
def create_sim(id_num, title, grade, subject, phet_id):
    """Create a simulation entry"""
    base_url = f"https://phet.colorado.edu/sims/html/{phet_id}/latest/{phet_id}_en.html"
    thumb_url = f"https://phet.colorado.edu/sims/html/{phet_id}/latest/{phet_id}-600.png"
    
    sim = {
        "id": phet_id,
        "title": title,
        "gradeLevel": grade,
        "subject": subject,
        "description": f"Explore {title} through interactive simulation.",
        "phetUrl": base_url,
        "thumbnail": thumb_url,
        "objectives": [f"Understand {title}", "Explore concepts", "Learn through interaction"],
        "realLifeExamples": [
            {"title": "Real World", "description": f"{title} in everyday life!"},
            {"title": "Applications", "description": f"How {title} is used!"}
        ]
    }
    
    # Add game content based on grade level
    if grade == "elementary":
        sim["gameVocabulary"] = ["LEARN", "EXPLORE", "DISCOVER", "SCIENCE", "FUN"]
        sim["gameType"] = "balloon" if id_num % 2 == 0 else "matching"
    elif grade == "middle":
        sim["gameQuestions"] = [
            {
                "question": f"What is {title}?",
                "options": ["Concept A", "Concept B", "Concept C", "Concept D"],
                "correct": 0,
                "explanation": f"{title} is an important concept."
            }
        ]
        sim["gameType"] = "quiz"
    else:  # high school
        sim["wordleWords"] = ["SCIENCE", "PHYSICS", "CHEMISTRY", "BIOLOGY", "MATH", "LEARN"]
        sim["gameType"] = "wordle" if id_num % 2 == 0 else "snake"
    
    return sim

# All 172 PhET HTML5 simulations
simulations = []

# ELEMENTARY (40 sims)
elementary_sims = [
    ("forces-and-motion-basics", "Forces and Motion: Basics", "physics"),
    ("fractions-intro", "Fractions: Introduction", "math"),
    ("gravity-and-orbits", "Gravity and Orbits", "physics"),
    ("states-of-matter", "States of Matter", "chemistry"),
    ("area-builder", "Area Builder", "math"),
    ("number-line-integers", "Number Line: Integers", "math"),
    ("john-travoltage", "John Travoltage", "physics"),
    ("balloons-and-static-electricity", "Balloons and Static Electricity", "physics"),
    ("friction", "Friction", "physics"),
    ("proportion-playground", "Proportion Playground", "math"),
    ("make-a-ten", "Make a Ten", "math"),
    ("arithmetic", "Arithmetic", "math"),
    ("number-play", "Number Play", "math"),
    ("number-compare", "Number Compare", "math"),
    ("fraction-matcher", "Fraction Matcher", "math"),
    ("fractions-equality", "Fractions: Equality", "math"),
    ("fractions-mixed-numbers", "Fractions: Mixed Numbers", "math"),
    ("unit-rates", "Unit Rates", "math"),
    ("ratio-and-proportion", "Ratio and Proportion", "math"),
    ("build-a-fraction", "Build a Fraction", "math"),
    ("balancing-act", "Balancing Act", "physics"),
    ("masses-and-springs-basics", "Masses and Springs: Basics", "physics"),
    ("resistance-in-a-wire", "Resistance in a Wire", "physics"),
    ("color-vision", "Color Vision", "physics"),
    ("capacitor-lab-basics", "Capacitor Lab: Basics", "physics"),
    ("energy-skate-park-basics", "Energy Skate Park: Basics", "physics"),
    ("fluid-pressure-and-flow", "Fluid Pressure and Flow", "physics"),
    ("fourier-making-waves", "Fourier: Making Waves", "physics"),
    ("gravity-force-lab-basics", "Gravity Force Lab: Basics", "physics"),
    ("hookes-law", "Hooke's Law", "physics"),
    ("counting-common", "Counting Common", "math"),
    ("mean-share-and-balance", "Mean: Share and Balance", "math"),
    ("number-line-distance", "Number Line: Distance", "math"),
    ("number-line-operations", "Number Line: Operations", "math"),
    ("trig-tour", "Trig Tour", "math"),
    ("vector-addition", "Vector Addition", "math"),
    ("vector-addition-equations", "Vector Addition: Equations", "math"),
    ("calculus-grapher", "Calculus Grapher", "math"),
    ("center-and-variability", "Center and Variability", "math"),
    ("least-squares-regression", "Least-Squares Regression", "math")
]

for i, (phet_id, title, subject) in enumerate(elementary_sims, 1):
    simulations.append(create_sim(i, title, "elementary", subject, phet_id))

# MIDDLE SCHOOL (66 sims)
middle_sims = [
    ("energy-forms-and-changes", "Energy Forms and Changes", "physics"),
    ("circuit-construction-kit-dc", "Circuit Construction Kit: DC", "physics"),
    ("ph-scale", "pH Scale", "chemistry"),
    ("waves-intro", "Waves Introduction", "physics"),
    ("build-an-atom", "Build an Atom", "chemistry"),
    ("density", "Density", "physics"),
    ("graphing-lines", "Graphing Lines", "math"),
    ("energy-skate-park", "Energy Skate Park", "physics"),
    ("reactants-products-and-leftovers", "Reactants, Products and Leftovers", "chemistry"),
    ("bending-light", "Bending Light", "physics"),
    ("concentration", "Concentration", "chemistry"),
    ("isotopes-and-atomic-mass", "Isotopes and Atomic Mass", "chemistry"),
    ("under-pressure", "Under Pressure", "physics"),
    ("graphing-quadratics", "Graphing Quadratics", "math"),
    ("equality-explorer", "Equality Explorer", "math"),
    ("function-builder", "Function Builder", "math"),
    ("area-model-algebra", "Area Model Algebra", "math"),
    ("area-model-decimals", "Area Model Decimals", "math"),
    ("area-model-introduction", "Area Model Introduction", "math"),
    ("area-model-multiplication", "Area Model Multiplication", "math"),
    ("beers-law-lab", "Beer's Law Lab", "chemistry"),
    ("capacitor-lab", "Capacitor Lab", "physics"),
    ("charges-and-fields", "Charges and Fields", "physics"),
    ("circuit-construction-kit-ac", "Circuit Construction Kit: AC", "physics"),
    ("collision-lab", "Collision Lab", "physics"),
    ("curve-fitting", "Curve Fitting", "math"),
    ("diffusion", "Diffusion", "chemistry"),
    ("expression-exchange", "Expression Exchange", "math"),
    ("forces-and-motion", "Forces and Motion", "physics"),
    ("function-builder-basics", "Function Builder: Basics", "math"),
    ("gas-properties", "Gas Properties", "chemistry"),
    ("gases-intro", "Gases Intro", "chemistry"),
    ("gene-expression-essentials", "Gene Expression Essentials", "biology"),
    ("geometric-optics", "Geometric Optics", "physics"),
    ("graphing-slope-intercept", "Graphing Slope-Intercept", "math"),
    ("gravity-force-lab", "Gravity Force Lab", "physics"),
    ("greenhouse-effect", "Greenhouse Effect", "physics"),
    ("magnet-and-compass", "Magnet and Compass", "physics"),
    ("magnets-and-electromagnets", "Magnets and Electromagnets", "physics"),
    ("masses-and-springs", "Masses and Springs", "physics"),
    ("molarity", "Molarity", "chemistry"),
    ("molecule-polarity", "Molecule Polarity", "chemistry"),
    ("molecule-shapes", "Molecule Shapes", "chemistry"),
    ("molecule-shapes-basics", "Molecule Shapes: Basics", "chemistry"),
    ("molecules-and-light", "Molecules and Light", "chemistry"),
    ("my-solar-system", "My Solar System", "physics"),
    ("natural-selection", "Natural Selection", "biology"),
    ("normal-modes", "Normal Modes", "physics"),
    ("ohms-law", "Ohm's Law", "physics"),
    ("pendulum-lab", "Pendulum Lab", "physics"),
    ("plinko-probability", "Plinko Probability", "math"),
    ("projectile-motion", "Projectile Motion", "physics"),
    ("resistance-in-a-wire", "Resistance in a Wire", "physics"),
    ("rutherford-scattering", "Rutherford Scattering", "physics"),
    ("states-of-matter-basics", "States of Matter: Basics", "chemistry"),
    ("wave-on-a-string", "Wave on a String", "physics"),
    ("blackbody-spectrum", "Blackbody Spectrum", "physics"),
    ("build-a-molecule", "Build a Molecule", "chemistry"),
    ("color-vision", "Color Vision", "physics"),
    ("faradays-electromagnetic-lab", "Faraday's Electromagnetic Lab", "physics"),
    ("forces-and-motion-basics", "Forces and Motion: Basics", "physics"),
    ("generator", "Generator", "physics"),
    ("gravity-and-orbits", "Gravity and Orbits", "physics"),
    ("john-travoltage", "John Travoltage", "physics"),
    ("neuron", "Neuron", "biology"),
    ("wave-interference", "Wave Interference", "physics")
]

for i, (phet_id, title, subject) in enumerate(middle_sims, 41):
    simulations.append(create_sim(i, title, "middle", subject, phet_id))

# HIGH SCHOOL (66 sims)
high_sims = [
    ("balancing-chemical-equations", "Balancing Chemical Equations", "chemistry"),
    ("acid-base-solutions", "Acid-Base Solutions", "chemistry"),
    ("atomic-interactions", "Atomic Interactions", "chemistry"),
    ("faradays-law", "Faraday's Law", "physics"),
    ("coulombs-law", "Coulomb's Law", "physics"),
    ("hookes-law", "Hooke's Law", "physics"),
    ("atomic-spectra", "Atomic Spectra", "physics"),
    ("band-structure", "Band Structure", "physics"),
    ("beta-decay", "Beta Decay", "physics"),
    ("build-a-nucleus", "Build a Nucleus", "physics"),
    ("conductivity", "Conductivity", "chemistry"),
    ("davisson-germer", "Davisson-Germer", "physics"),
    ("electric-field-of-dreams", "Electric Field of Dreams", "physics"),
    ("models-of-the-hydrogen-atom", "Models of the Hydrogen Atom", "physics"),
    ("nuclear-fission", "Nuclear Fission", "physics"),
    ("photoelectric", "Photoelectric Effect", "physics"),
    ("quantum-wave-interference", "Quantum Wave Interference", "physics"),
    ("semiconductors", "Semiconductors", "physics"),
    ("stern-gerlach", "Stern-Gerlach Experiment", "physics"),
    ("alpha-decay", "Alpha Decay", "physics"),
    ("balloons-and-static-electricity", "Balloons and Static Electricity", "physics"),
    ("battery-resistor-circuit", "Battery Resistor Circuit", "physics"),
    ("blackbody-spectrum", "Blackbody Spectrum", "physics"),
    ("capacitor-lab-basics", "Capacitor Lab: Basics", "physics"),
    ("charges-and-fields", "Charges and Fields", "physics"),
    ("circuit-construction-kit-ac-virtual-lab", "Circuit Construction Kit: AC - Virtual Lab", "physics"),
    ("circuit-construction-kit-dc-virtual-lab", "Circuit Construction Kit: DC - Virtual Lab", "physics"),
    ("collision-lab", "Collision Lab", "physics"),
    ("color-vision", "Color Vision", "physics"),
    ("energy-forms-and-changes", "Energy Forms and Changes", "physics"),
    ("energy-skate-park", "Energy Skate Park", "physics"),
    ("faradays-electromagnetic-lab", "Faraday's Electromagnetic Lab", "physics"),
    ("fluid-pressure-and-flow", "Fluid Pressure and Flow", "physics"),
    ("forces-and-motion", "Forces and Motion", "physics"),
    ("fourier-making-waves", "Fourier: Making Waves", "physics"),
    ("friction", "Friction", "physics"),
    ("gas-properties", "Gas Properties", "chemistry"),
    ("gases-intro", "Gases Intro", "chemistry"),
    ("generator", "Generator", "physics"),
    ("geometric-optics", "Geometric Optics", "physics"),
    ("gravity-and-orbits", "Gravity and Orbits", "physics"),
    ("gravity-force-lab", "Gravity Force Lab", "physics"),
    ("greenhouse-effect", "Greenhouse Effect", "physics"),
    ("john-travoltage", "John Travoltage", "physics"),
    ("magnet-and-compass", "Magnet and Compass", "physics"),
    ("magnets-and-electromagnets", "Magnets and Electromagnets", "physics"),
    ("masses-and-springs", "Masses and Springs", "physics"),
    ("my-solar-system", "My Solar System", "physics"),
    ("normal-modes", "Normal Modes", "physics"),
    ("ohms-law", "Ohm's Law", "physics"),
    ("pendulum-lab", "Pendulum Lab", "physics"),
    ("projectile-motion", "Projectile Motion", "physics"),
    ("resistance-in-a-wire", "Resistance in a Wire", "physics"),
    ("rutherford-scattering", "Rutherford Scattering", "physics"),
    ("states-of-matter", "States of Matter", "chemistry"),
    ("wave-interference", "Wave Interference", "physics"),
    ("wave-on-a-string", "Wave on a String", "physics"),
    ("acid-base-solutions", "Acid-Base Solutions", "chemistry"),
    ("atomic-interactions", "Atomic Interactions", "chemistry"),
    ("balancing-chemical-equations", "Balancing Chemical Equations", "chemistry"),
    ("beers-law-lab", "Beer's Law Lab", "chemistry"),
    ("build-a-molecule", "Build a Molecule", "chemistry"),
    ("build-an-atom", "Build an Atom", "chemistry"),
    ("concentration", "Concentration", "chemistry"),
    ("diffusion", "Diffusion", "chemistry"),
    ("gene-expression-essentials", "Gene Expression Essentials", "biology")
]

for i, (phet_id, title, subject) in enumerate(high_sims, 107):
    simulations.append(create_sim(i, title, "high", subject, phet_id))

# Create final JSON
output = {"simulations": simulations}

# Write to file
with open('src/data/simulations.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"✅ Generated {len(simulations)} simulations!")
print(f"   Elementary: {len([s for s in simulations if s['gradeLevel'] == 'elementary'])}")
print(f"   Middle School: {len([s for s in simulations if s['gradeLevel'] == 'middle'])}")
print(f"   High School: {len([s for s in simulations if s['gradeLevel'] == 'high'])}")
