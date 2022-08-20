export default (obj) => {
	obj = JSON.parse(obj)
	if (obj) {
		return `
			--xs: ${obj.xsmall || 12};
			--sm: ${obj.small || obj.xsmall || 12};
			--md: ${obj.medium || obj.small || obj.xsmall || 12};
			--lg: ${obj.large || obj.medium || obj.small || obj.xsmall || 12};
			--xl: ${obj.xlarge || obj.large || obj.medium || obj.small || obj.xsmall || 12};
		`
	}
}
