export default (obj) => {
	obj = JSON.parse(obj)
	if (obj) {
		return `
			--xs: ${obj.xsmall};
			--sm: ${obj.small || obj.xsmall};
			--md: ${obj.medium || obj.small || obj.xsmall};
			--lg: ${obj.large || obj.medium || obj.small || obj.xsmall};
			--xl: ${obj.xlarge || obj.large || obj.medium || obj.small || obj.xsmall};
		`
	}
}
