
/* eslint-disable no-new */
// import Vue from 'vue';

const timeline = {
    namespaced: true,
    state: {
        all: [],
        original: [],
        state_filters: [],
    },
    mutations: {
        initTimelineV1(state, all) {
            const res = {};
            all.sort((a, b) => a.d_created - b.d_created);
            all.forEach(((v) => {
                const d = new Date(v.d_created * 1000);
                const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
                const moLong = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
                const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                res[moLong] || (res[moLong] = []);
                v.hDate = `${mo} ${da} ${ye} - ${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}${d.getMinutes()}`;
                res[moLong].push(v);
                return v;
            }));
            state.original = { ...res };
            state.all = res;
        },
        filterBy(state, filterName) {
            if (state.state_filters.indexOf(filterName) !== -1) {
                state.state_filters = state.state_filters.filter(
                    item => item !== filterName
                );
            } else {
                state.state_filters.push(filterName);
            }
            const filterdData = {};
            state.all = state.original;
            state.state_filters[0] === null && (state.state_filters = [])
            if (state.state_filters.length === 0) {
                state.all = state.original;
                return;
            }
            Object.keys(state.all).map(
                (month) => {
                    filterdData[month] = [...state.all[month].filter(
                        item => state.state_filters.indexOf(item.resource_type) !== -1
                    )];
                    return filterdData;
                },
            );
            console.log("filterdData: ", filterdData);
            state.all = filterdData;
        },
    },
    actions: {
        initTimelineV1({ commit }, all) {
            commit('initTimelineV1', all);
        },
        filterBy({ commit }, filter) {
            commit('filterBy', filter);
        },
    },
    getters: {
        full: state => state.all, // -> getters['timeline/full']
        state_filters: state => state.state_filters
    }
};

export default timeline;
