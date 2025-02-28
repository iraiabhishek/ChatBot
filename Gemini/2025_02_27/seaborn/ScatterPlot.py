import seaborn as sns
import matplotlib.pyplot as plt

# Sample data
data = sns.load_dataset("penguins")

# Scatter plot
sns.scatterplot(x="bill_length_mm", y="bill_depth_mm", hue="species", data=data)

# Show plot
plt.show()
