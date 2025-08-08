# Bitcoin Simulations (Socratic Edition)

Drop-in React components:
- DifficultyAdjuster
- RelativeLocktimeLab
- PSBTDecoderLab

How to use:
1) Copy this folder into your repo (e.g. `./sims`).
2) Import in your app:
   ```js
   import { DifficultyAdjuster, RelativeLocktimeLab, PSBTDecoderLab } from './sims';
   import './sims/src/styles/sims.css';
   ```
3) Add routes if using React Router:
   ```jsx
   <Route path="/sim/difficulty" element={<DifficultyAdjuster />} />
   <Route path="/sim/locktime" element={<RelativeLocktimeLab />} />
   <Route path="/sim/psbt" element={<PSBTDecoderLab />} />
   ```
No real keys or spendable UTXOs. Client-only.
