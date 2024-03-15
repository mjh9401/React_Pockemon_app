import React from 'react'
import { useEffect } from 'react';

const DamageRelations = ({damages}) => {

    useEffect(() => {
        const arrayDamage = damages.map((damage)=>
            separateObjectBetweenToAndFrom(damage))
        
        if(arrayDamage.length === 2){
            // 합치는 부분
            const obj = joinDamageRelations(arrayDamage);
            reduceDuplicateValues(postDamageValue(obj.from));
        }else{
            postDamageValue(arrayDamage[0].from);
        }

    }, [])

    const reduceDuplicateValues = (props)=>{
        const duplicateValues = {
            double_damage : '4x',
            half_damage : '1/4x',
            no_damage : '0x'
        }

        Object.entries(props)
            .reduce((acc,[keyName,value]) => {
                const key = keyName;
                console.log([keyName,value])
                const verifiedValue = filterForUniqueValues(value,duplicateValues[key]);
            })
    }

    const filterForUniqueValues = (valueForFiltering,damageValue) => {
        console.log(valueForFiltering,damageValue);
    }

    const joinDamageRelations = (props) =>{
        return{
            to : joinObjects(props,'to'),
            from : joinObjects(props,'from')
        }
    }
    
    const joinObjects = (props,string) =>{
        const key = string;
        const firstArrayValue = props[0][key];
        const secondArrayValue = props[1][key];

        const result = Object.entries(secondArrayValue)
            .reduce((acc,[keyName,value]) => {
                const result = firstArrayValue[keyName].concat(value);
                return(acc={[keyName]:result, ...acc})
            },{});
        return result;
    }

    const postDamageValue = (props)=>{
        const result = Object.entries(props)
            .reduce((acc,[keyName,value]) =>{
                const key = keyName;
                const valuesOfKeyName = {
                    double_damage: '2x',
                    half_damage: '1/2',
                    no_damage : '0x'
                };
                return (acc = {[keyName]:value.map(i => ({
                    damageValue: valuesOfKeyName[key], ...i
                })),
                ...acc
            })
        },{});

        //console.log(result);
        return result;
    }

    const separateObjectBetweenToAndFrom = (damage) =>{
        const from = filterDamageRelations('_from',damage);
        //console.log('from',from);
        const to = filterDamageRelations('_to',damage);
        //console.log('to',to);

        return {from, to};
    } 

    const filterDamageRelations = (valueFilter, damage) => {
        const result = Object.entries(damage)
            .filter(([keyName, value])=>{
                // console.log('keyName',keyName);
                // console.log('value', value);
                return keyName.includes(valueFilter);
            })
            .reduce((acc,[keyName,value]) => {
                const keyWithValueFilterRemove = keyName.replace(valueFilter,'');
                //console.log(acc,[keyName,value]);
                return (acc = {[keyWithValueFilterRemove] : value, ...acc})
            },{});
        return result;
    }

    return (
        <div>DamageRelations</div>
    )
}

export default DamageRelations