function reportBMI(val: number) {
    if (val < 18.5) return 'Underweight'
    if (val >= 18.5 && val < 24.9) return 'Normal weight'
    if (val > 25 && val < 29.9) return 'Overweight'
    if (val > 30) return 'Obesity'
}

export default reportBMI
