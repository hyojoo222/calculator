import React, { useState } from 'react';
import './Calculator.css';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [lastWasOperator, setLastWasOperator] = useState<boolean>(false);

  const calculate = (expr: string): string => {
    try {
      // 移除表达式开头和结尾的空格
      expr = expr.trim();
      
      // 如果表达式以运算符结尾，移除它
      if (/[+\-*/]$/.test(expr)) {
        expr = expr.slice(0, -1);
      }

      // 将表达式分割成数字和运算符
      const tokens = expr.split(/\s+/);
      
      // 如果只有一个数字，直接返回
      if (tokens.length === 1) return tokens[0];
      
      // 执行计算
      let result = parseFloat(tokens[0]);
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);
        
        switch (operator) {
          case '+':
            result += operand;
            break;
          case '-':
            result -= operand;
            break;
          case '*':
            result *= operand;
            break;
          case '/':
            if (operand === 0) throw new Error('除数不能为零');
            result /= operand;
            break;
          default:
            throw new Error('无效的运算符');
        }
      }
      
      // 处理结果，避免JavaScript浮点数精度问题
      return Number(result.toFixed(8)).toString();
    } catch (error) {
      return 'Error';
    }
  };

  const handleNumber = (number: string) => {
    if (hasResult) {
      setDisplay(number);
      setEquation(number);
      setHasResult(false);
    } else {
      // 处理小数点
      if (number === '.') {
        if (display.includes('.')) return;
        setDisplay(display + number);
        setEquation(equation + number);
      } else {
        if (display === '0' && number !== '.') {
          setDisplay(number);
          setEquation(lastWasOperator ? equation + number : number);
        } else {
          setDisplay(display + number);
          setEquation(equation + number);
        }
      }
    }
    setLastWasOperator(false);
  };

  const handleOperator = (operator: string) => {
    if (hasResult) {
      setEquation(display + ' ' + operator + ' ');
      setHasResult(false);
    } else if (lastWasOperator) {
      // 如果上一个输入是运算符，替换它
      setEquation(equation.slice(0, -3) + ' ' + operator + ' ');
    } else {
      setEquation(equation + ' ' + operator + ' ');
    }
    setDisplay('0');
    setLastWasOperator(true);
  };

  const handleEqual = () => {
    const result = calculate(equation);
    setDisplay(result);
    setEquation(result);
    setHasResult(true);
    setLastWasOperator(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
    setLastWasOperator(false);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation || '0'}</div>
        <div className="result">{display}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear} className="clear">C</button>
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('/')} className="operator">÷</button>
        
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('*')} className="operator">×</button>
        
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('-')} className="operator">-</button>
        
        <button onClick={() => handleNumber('0')} className="zero">0</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button onClick={() => handleOperator('+')} className="operator">+</button>
        
        <button onClick={handleEqual} className="equal">=</button>
      </div>
    </div>
  );
};

export default Calculator; 