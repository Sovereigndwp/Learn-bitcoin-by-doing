import React, { useState } from 'react';
import { ContinueButton } from '../../../../components/ui';
import '../../../../components/ModuleCommon.css';

export default function CompareIntro() {
  const propertyList = [
    { key: "Self Custody", label: "Self Custody", fiatPass: false, goldPass: true },
    { key: "Decentralization", label: "Decentralization", fiatPass: false, goldPass: true },
    { key: "Verifiability", label: "Verifiability", fiatPass: true, goldPass: false },
    { key: "Fixed Supply", label: "Fixed Supply", fiatPass: false, goldPass: true },
    { key: "Genuine Scarcity", label: "Genuine Scarcity", fiatPass: false, goldPass: true },
    { key: "Fungibility", label: "Fungibility", fiatPass: true, goldPass: false },
    { key: "Portability", label: "Portability", fiatPass: true, goldPass: false },
    { key: "Divisibility", label: "Divisibility", fiatPass: true, goldPass: false },
    { key: "Durability", label: "Durability", fiatPass: false, goldPass: true },
    { key: "Acceptability", label: "Acceptability", fiatPass: true, goldPass: true }
  ];

  const [selections, setSelections] = useState(
    Object.fromEntries(propertyList.map((p) => [p.key, '']))
  );

  const verdict = (prop, choice) => {
    if (!choice) return '';
    if (choice === 'bitcoin') return '✔';
    if (choice === 'gold') return prop.goldPass ? '✔' : '✖';
    return prop.fiatPass ? '✔' : '✖';
  };

  return (
    <div className="step-content comparison">
      <div className="module-header-box">
        <h2>Bitcoin vs Other Money</h2>
        <p>Select a money type for each property. Green means it passes.</p>
      </div>

      <div className="content-text">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Property</th>
              <th>Choose</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {propertyList.map((prop) => (
              <tr key={prop.key}>
                <td>{prop.label}</td>
                <td>
                  <select
                    value={selections[prop.key]}
                    onChange={(e) =>
                      setSelections({ ...selections, [prop.key]: e.target.value })
                    }
                  >
                    <option value="">—</option>
                    <option value="fiat">Fiat</option>
                    <option value="gold">Gold</option>
                    <option value="bitcoin">Bitcoin</option>
                  </select>
                </td>
                <td className="text-center">
                  {verdict(prop, selections[prop.key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
